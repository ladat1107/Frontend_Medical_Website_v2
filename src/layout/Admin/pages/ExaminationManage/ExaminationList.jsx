"use client"

import { useState, useEffect } from "react"
import { Table, Tag, Button, Input, Space, Select, DatePicker, Modal, Tooltip, message } from "antd"
import {
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  FileExcelOutlined,
  PrinterOutlined,
  SearchOutlined,
} from "@ant-design/icons"
import ExaminationForm from "./ExaminationForm"
import ExaminationDrawer from "./ExaminationDetail"
import { STATUS_BE } from "@/constant/value"

const { RangePicker } = DatePicker
const { Option } = Select

const ExaminationList = ({ examinationList }) => {
  const [examinations, setExaminations] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [dateRange, setDateRange] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false)
  const [currentExamination, setCurrentExamination] = useState(null)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  })

  useEffect(() => {
    // Filter by status if needed
    let filteredData = [...examinationList]
    if (filterStatus !== "all") {
      if (filterStatus === STATUS_BE.EXAMINING) {
        filteredData = filteredData.filter((item) => item.status === STATUS_BE.WAITING || item.status === STATUS_BE.PAID || item.status === STATUS_BE.EXAMINING)
      } else {
        filteredData = filteredData.filter((item) => item.status === filterStatus)
      }
    }

    // Filter by date range if needed
    if (dateRange) {
      filteredData = filteredData.filter((item) => {
        const itemDate = new Date(item.admissionDate)
        return itemDate >= dateRange[0].toDate() && itemDate <= dateRange[1].toDate()
      })
    }

    // Filter by search text
    if (searchText) {
      filteredData = filteredData.filter(
        (item) => {
          const patient = " " + item?.userExaminationData?.lastName + " " + item?.userExaminationData?.firstName + " ";
          return patient.toLowerCase().includes(searchText.toLowerCase()) ||
            item?.diseaseName?.toLowerCase().includes(searchText.toLowerCase()) ||
            item?.symptom?.toLowerCase().includes(searchText.toLowerCase()) ||
            item?.id?.toString().includes(searchText)
        }
      )
    }

    setExaminations(
      filteredData.slice((pagination.current - 1) * pagination.pageSize, pagination.current * pagination.pageSize),
    )

    setPagination({
      ...pagination,
      total: filteredData.length,
    })

  }, [examinationList, pagination.current, pagination.pageSize, filterStatus, dateRange, searchText])


  const handleTableChange = (pagination) => {
    setPagination(pagination)
  }

  const handleSearch = (e) => {
    setSearchText(e.target.value)
    setPagination({ ...pagination, current: 1 })
  }

  const handleStatusFilter = (value) => {
    setFilterStatus(value)
    setPagination({ ...pagination, current: 1 })
  }

  const handleDateRangeChange = (dates) => {
    setDateRange(dates)
    setPagination({ ...pagination, current: 1 })
  }

  const showModal = (record = null) => {
    setCurrentExamination(record)
    setIsModalVisible(true)
  }

  const showDetailModal = (record) => {
    setCurrentExamination(record)
    setIsDetailModalVisible(true)
  }

  const handleModalCancel = () => {
    setIsModalVisible(false)
    setCurrentExamination(null)
  }

  const handleDetailModalCancel = () => {
    setIsDetailModalVisible(false)
    setCurrentExamination(null)
  }

  const handleSave = (values) => {
    // Handle save logic here
    if (currentExamination) {
      // Update existing examination
      message.success("Cập nhật đơn khám thành công")
    } else {
      // Create new examination
      message.success("Tạo đơn khám mới thành công")
    }
    setIsModalVisible(false)
    fetchExaminations()
  }

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa đơn khám này không?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        // Delete logic here
        message.success("Xóa đơn khám thành công")
        fetchExaminations()
      },
    })
  }

  const handleExport = () => {
    message.success("Xuất dữ liệu thành công")
  }

  const handlePrint = (record) => {
    message.success("Đang chuẩn bị in đơn khám")
  }

  const columns = [
    {
      title: "Mã đơn",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Tên bệnh nhân",
      dataIndex: "patientName",
      key: "patientName",
      render: (_, record) => {
        const patient = record?.userExaminationData?.lastName + " " + record?.userExaminationData?.firstName;
        return <a onClick={() => showDetailModal(record)}>{patient}</a>
      }
    },
    {
      title: "Triệu chứng",
      dataIndex: "symptom",
      key: "symptom",
      ellipsis: true,
    },
    {
      title: "Chẩn đoán",
      dataIndex: "diseaseName",
      key: "diseaseName",
      ellipsis: true,
    },
    {
      title: "Ngày khám",
      dataIndex: "admissionDate",
      key: "admissionDate",
      render: (date) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: "Phòng khám",
      dataIndex: "roomName",
      key: "roomName",
    },
    {
      title: "Loại",
      dataIndex: "is_appointment",
      key: "is_appointment",
      render: (value) => <Tag color={value === 1 ? "purple" : "cyan"}>{value === 1 ? "Lịch hẹn" : "Khám thường"}</Tag>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "blue"
        let text = "Chờ duyệt"

        if (status === STATUS_BE.EXAMINING || status === STATUS_BE.PAID || status === STATUS_BE.WAITING) {
          color = "orange"
          text = "Đang khám"
        } else if (status === STATUS_BE.DONE) {
          color = "green"
          text = "Hoàn thành"
        } else if (status === STATUS_BE.INACTIVE) {
          color = "red"
          text = "Hủy"
        } else if (status === STATUS_BE.PENDING) {
          color = "blue"
          text = "Chờ duyệt"
        }

        return <Tag color={color}>{text}</Tag>
      },
    },
    {
      title: "Thành tiền",
      dataIndex: "price",
      className: "text-center",
      key: "price",
      render: (price, record) => {
        const payment = record?.paymentData;
        if (payment) {
          return <span className="text-[12px] text-primary-tw font-bold" >{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(payment?.amount)}</span>
        }
        return (
          <span className="text-[12px] text-gray-500">Chưa thanh toán</span>
        )
      },
    }
  ]

  return (
    <div>
      <div className="mb-4 flex flex-wrap justify-between items-center gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Input
            placeholder="Tìm kiếm đơn khám"
            prefix={<SearchOutlined />}
            className="w-full sm:w-64 border-gray-300"
            value={searchText}
            onChange={handleSearch}
          />

          <Select placeholder="Trạng thái" style={{ width: 150 }} onChange={handleStatusFilter} defaultValue="all">
            <Option value="all">Tất cả</Option>
            <Option value={STATUS_BE.PENDING}>Chờ duyệt</Option>
            <Option value={STATUS_BE.EXAMINING}>Đang khám</Option>
            <Option value={STATUS_BE.DONE}>Hoàn thành</Option>
            <Option value={STATUS_BE.INACTIVE}>Đã hủy</Option>
          </Select>
          <RangePicker onChange={handleDateRangeChange} format="DD/MM/YYYY" />
        </div>
        <div className="flex gap-2">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => showModal()}
            style={{ backgroundColor: "#00B5F1" }}
          >
            Tạo đơn mới
          </Button>
          <Button icon={<FileExcelOutlined />} onClick={handleExport}>
            Xuất Excel
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={examinations}
        rowKey="id"
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
        scroll={{ x: 1200 }}
        size="middle"
      />

      {/* Examination Form Modal */}
      <Modal
        title={currentExamination ? "Cập nhật đơn khám" : "Tạo đơn khám mới"}
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
        width={800}
      >
        <ExaminationForm initialValues={currentExamination} onSave={handleSave} onCancel={handleModalCancel} />
      </Modal>

      {currentExamination &&
        <ExaminationDrawer open={isDetailModalVisible}
          onClose={() => setIsDetailModalVisible(false)}
          examinationId={currentExamination.id} />}
    </div>
  )
}

export default ExaminationList
