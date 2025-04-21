"use client"

import { useState, useEffect } from "react"
import { Card, Row, Col, Statistic, DatePicker, Select, Divider, Table, Tag } from "antd"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { UserOutlined, MedicineBoxOutlined, DollarOutlined, CalendarOutlined } from "@ant-design/icons"

const { RangePicker } = DatePicker
const { Option } = Select

const ExaminationStats = () => {
  const [loading, setLoading] = useState(false)
  const [dateRange, setDateRange] = useState(null)
  const [timeFrame, setTimeFrame] = useState("month")
  const [examinationStats, setExaminationStats] = useState({
    totalExaminations: 0,
    totalAppointments: 0,
    totalRevenue: 0,
    averageExaminationsPerDay: 0,
    statusDistribution: [],
    examinationTrend: [],
    topDoctors: [],
    topDiseases: [],
  })

  useEffect(() => {
    fetchStatistics()
  }, [dateRange, timeFrame])

  const fetchStatistics = async () => {
    setLoading(true)
    try {
      // Mock data for demonstration
      const totalExaminations = 1245
      const totalAppointments = 532
      const totalRevenue = 1250000000
      const averageExaminationsPerDay = 42

      const statusDistribution = [
        { name: "Chờ khám", value: 180, color: "#1890ff" },
        { name: "Đang khám", value: 120, color: "#faad14" },
        { name: "Hoàn thành", value: 900, color: "#52c41a" },
        { name: "Hủy", value: 45, color: "#ff4d4f" },
      ]

      const examinationTrend =
        timeFrame === "month"
          ? [
              { name: "T1", examinations: 120, appointments: 50, revenue: 120000000 },
              { name: "T2", examinations: 140, appointments: 60, revenue: 140000000 },
              { name: "T3", examinations: 160, appointments: 70, revenue: 160000000 },
              { name: "T4", examinations: 180, appointments: 80, revenue: 180000000 },
              { name: "T5", examinations: 200, appointments: 90, revenue: 200000000 },
              { name: "T6", examinations: 220, appointments: 100, revenue: 220000000 },
              { name: "T7", examinations: 240, appointments: 110, revenue: 240000000 },
              { name: "T8", examinations: 260, appointments: 120, revenue: 260000000 },
              { name: "T9", examinations: 280, appointments: 130, revenue: 280000000 },
              { name: "T10", examinations: 300, appointments: 140, revenue: 300000000 },
              { name: "T11", examinations: 320, appointments: 150, revenue: 320000000 },
              { name: "T12", examinations: 340, appointments: 160, revenue: 340000000 },
            ]
          : [
              { name: "Tuần 1", examinations: 80, appointments: 30, revenue: 80000000 },
              { name: "Tuần 2", examinations: 90, appointments: 35, revenue: 90000000 },
              { name: "Tuần 3", examinations: 100, appointments: 40, revenue: 100000000 },
              { name: "Tuần 4", examinations: 110, appointments: 45, revenue: 110000000 },
            ]

      const topDoctors = [
        { id: 1, name: "Bác sĩ 1", department: "Khoa Nội", examinations: 120, successRate: 98 },
        { id: 2, name: "Bác sĩ 2", department: "Khoa Ngoại", examinations: 110, successRate: 97 },
        { id: 3, name: "Bác sĩ 3", department: "Khoa Nhi", examinations: 100, successRate: 99 },
        { id: 4, name: "Bác sĩ 4", department: "Khoa Sản", examinations: 90, successRate: 96 },
        { id: 5, name: "Bác sĩ 5", department: "Khoa Mắt", examinations: 80, successRate: 95 },
      ]

      const topDiseases = [
        { id: 1, name: "Cảm cúm", count: 200, percentage: 16 },
        { id: 2, name: "Đau dạ dày", count: 180, percentage: 14.5 },
        { id: 3, name: "Viêm họng", count: 150, percentage: 12 },
        { id: 4, name: "Đau đầu", count: 120, percentage: 9.6 },
        { id: 5, name: "Viêm xoang", count: 100, percentage: 8 },
      ]

      setExaminationStats({
        totalExaminations,
        totalAppointments,
        totalRevenue,
        averageExaminationsPerDay,
        statusDistribution,
        examinationTrend,
        topDoctors,
        topDiseases,
      })
    } catch (error) {
      console.error("Error fetching statistics:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDateRangeChange = (dates) => {
    setDateRange(dates)
  }

  const handleTimeFrameChange = (value) => {
    setTimeFrame(value)
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value)
  }

  const doctorColumns = [
    {
      title: "Bác sĩ",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Khoa",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Số ca khám",
      dataIndex: "examinations",
      key: "examinations",
      sorter: (a, b) => a.examinations - b.examinations,
    },
    {
      title: "Tỷ lệ thành công",
      dataIndex: "successRate",
      key: "successRate",
      render: (rate) => <Tag color={rate >= 95 ? "green" : rate >= 90 ? "blue" : "orange"}>{rate}%</Tag>,
      sorter: (a, b) => a.successRate - b.successRate,
    },
  ]

  const diseaseColumns = [
    {
      title: "Bệnh",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số ca",
      dataIndex: "count",
      key: "count",
      sorter: (a, b) => a.count - b.count,
    },
    {
      title: "Tỷ lệ",
      dataIndex: "percentage",
      key: "percentage",
      render: (percentage) => `${percentage}%`,
      sorter: (a, b) => a.percentage - b.percentage,
    },
  ]

  const COLORS = ["#1890ff", "#faad14", "#52c41a", "#ff4d4f", "#722ed1", "#13c2c2"]

  return (
    <div>
      <div className="mb-4 flex flex-wrap justify-between items-center gap-2">
        <div>
          <h2 className="text-xl font-bold">Thống kê đơn khám bệnh</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <RangePicker onChange={handleDateRangeChange} />
          <Select defaultValue="month" style={{ width: 120 }} onChange={handleTimeFrameChange}>
            <Option value="month">Theo tháng</Option>
            <Option value="week">Theo tuần</Option>
          </Select>
        </div>
      </div>

      {/* Overview Statistics */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title="Tổng đơn khám"
              value={examinationStats.totalExaminations}
              prefix={<MedicineBoxOutlined style={{ color: "#00B5F1" }} />}
              valueStyle={{ color: "#00B5F1" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title="Tổng lịch hẹn"
              value={examinationStats.totalAppointments}
              prefix={<CalendarOutlined style={{ color: "#722ed1" }} />}
              valueStyle={{ color: "#722ed1" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title="Tổng doanh thu"
              value={formatCurrency(examinationStats.totalRevenue)}
              prefix={<DollarOutlined style={{ color: "#52c41a" }} />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title="Trung bình/ngày"
              value={examinationStats.averageExaminationsPerDay}
              prefix={<UserOutlined style={{ color: "#faad14" }} />}
              valueStyle={{ color: "#faad14" }}
              suffix="ca"
            />
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} lg={12}>
          <Card title="Phân bố trạng thái đơn khám" bordered={false} className="shadow-sm">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={examinationStats.statusDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                >
                  {examinationStats.statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} ca`, "Số lượng"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Xu hướng đơn khám" bordered={false} className="shadow-sm">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={examinationStats.examinationTrend} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} ca`, "Số lượng"]} />
                <Legend />
                <Line type="monotone" dataKey="examinations" stroke="#00B5F1" name="Đơn khám" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="appointments" stroke="#722ed1" name="Lịch hẹn" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24}>
          <Card title="Doanh thu theo thời gian" bordered={false} className="shadow-sm">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={examinationStats.examinationTrend} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [formatCurrency(value), "Doanh thu"]} />
                <Legend />
                <Bar dataKey="revenue" fill="#52c41a" name="Doanh thu" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Divider orientation="left">Thống kê chi tiết</Divider>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Top bác sĩ có nhiều ca khám nhất" bordered={false} className="shadow-sm">
            <Table
              columns={doctorColumns}
              dataSource={examinationStats.topDoctors}
              rowKey="id"
              pagination={false}
              size="middle"
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Top bệnh phổ biến nhất" bordered={false} className="shadow-sm">
            <Table
              columns={diseaseColumns}
              dataSource={examinationStats.topDiseases}
              rowKey="id"
              pagination={false}
              size="middle"
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ExaminationStats
