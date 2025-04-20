"use client"
import { useGetExaminationById } from "@/hooks"
import { Drawer, Tag, Divider, Button, Empty, Statistic, Row, Col, Card, Typography, Collapse, Spin } from "antd"
import {
  User,
  Stethoscope,
  Pill,
  DollarSign,
  FileText,
  AlertCircle,
  Thermometer,
  CreditCard,
  Activity,
  FlaskRoundIcon as Flask,
  Heart,
  Weight,
  Ruler,
  Droplet,
  Printer,
  Edit,
  CheckCircle,
  XCircle,
  Clock,
  Info,
  Phone,
  Mail,
  Building,
  Calendar,
  TreesIcon as Lungs,
} from "lucide-react"
import { SPECIAL_EXAMINATION } from "@/constant/value"
import HistoryModal from "@/layout/Doctor/components/HistoryModal/HistoryModal"
import { useState } from "react"
const { Title, Text } = Typography
const { Panel } = Collapse

// Status mapping functions
const getStatusTag = (status) => {
  const statusMap = {
    0: { color: "gray", text: "Chưa xác định", icon: <Info size={14} className="mr-1" /> },
    1: { color: "blue", text: "Đang chờ", icon: <Clock size={14} className="mr-1" /> },
    2: { color: "processing", text: "Đang khám", icon: <Stethoscope size={14} className="mr-1" /> },
    3: { color: "warning", text: "Chờ thanh toán", icon: <CreditCard size={14} className="mr-1" /> },
    4: { color: "success", text: "Hoàn thành", icon: <CheckCircle size={14} className="mr-1" /> },
    5: { color: "error", text: "Đã hủy", icon: <XCircle size={14} className="mr-1" /> },
    6: { color: "default", text: "Vắng mặt", icon: <XCircle size={14} className="mr-1" /> },
    7: { color: "purple", text: "Đã thanh toán", icon: <DollarSign size={14} className="mr-1" /> },
  }

  const statusInfo = statusMap[status] || {
    color: "default",
    text: "Không xác định",
    icon: <Info size={14} className="mr-1" />,
  }
  return (
    <Tag color={statusInfo.color} className="flex items-center text-sm py-1 px-2">
      {statusInfo.icon}
      {statusInfo.text}
    </Tag>
  )
}

const getPaymentStatusTag = (status) => {
  const statusMap = {
    0: { color: "default", text: "Chưa thanh toán", icon: <Clock size={14} className="mr-1" /> },
    1: { color: "processing", text: "Đang xử lý", icon: <Clock size={14} className="mr-1" /> },
    2: { color: "success", text: "Đã thanh toán", icon: <CheckCircle size={14} className="mr-1" /> },
    3: { color: "error", text: "Thanh toán thất bại", icon: <XCircle size={14} className="mr-1" /> },
  }

  const statusInfo = statusMap[status] || {
    color: "default",
    text: "Không xác định",
    icon: <Info size={14} className="mr-1" />,
  }
  return (
    <Tag color={statusInfo.color} className="flex items-center text-sm py-1 px-2">
      {statusInfo.icon}
      {statusInfo.text}
    </Tag>
  )
}

const getPaymentMethodText = (method) => {
  const methodMap = {
    1: { text: "Tiền mặt", icon: <DollarSign size={14} className="mr-1" /> },
    2: { text: "Chuyển khoản", icon: <CreditCard size={14} className="mr-1" /> },
    3: { text: "Thẻ tín dụng", icon: <CreditCard size={14} className="mr-1" /> },
    4: { text: "Ví điện tử", icon: <CreditCard size={14} className="mr-1" /> },
  }

  const methodInfo = methodMap[method] || { text: "Không xác định", icon: <Info size={14} className="mr-1" /> }
  return (
    <div className="flex items-center">
      {methodInfo.icon}
      {methodInfo.text}
    </div>
  )
}

const getParaclinicalStatusTag = (status) => {
  const statusMap = {
    1: { color: "blue", text: "Chờ thực hiện", icon: <Clock size={14} className="mr-1" /> },
    2: { color: "processing", text: "Đang thực hiện", icon: <Activity size={14} className="mr-1" /> },
    3: { color: "warning", text: "Chờ kết quả", icon: <Clock size={14} className="mr-1" /> },
    4: { color: "success", text: "Hoàn thành", icon: <CheckCircle size={14} className="mr-1" /> },
    5: { color: "error", text: "Đã hủy", icon: <XCircle size={14} className="mr-1" /> },
  }

  const statusInfo = statusMap[status] || {
    color: "default",
    text: "Không xác định",
    icon: <Info size={14} className="mr-1" />,
  }
  return (
    <Tag color={statusInfo.color} className="flex items-center text-sm py-1 px-2">
      {statusInfo.icon}
      {statusInfo.text}
    </Tag>
  )
}

const formatDate = (dateString) => {
  if (!dateString) return "N/A"
  const date = new Date(dateString)
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount)
}
const ArraySpecialExamination = Object.entries(SPECIAL_EXAMINATION).map(([key, value]) => ({
  value: value.value,
  label: value.label,
}))
const formatSpecialExamination = (specialExamination) => {
  return ArraySpecialExamination.find((item) => item.value.includes(specialExamination))?.label || "Không xác định"
}
const ExaminationDrawer = ({ open, onClose, examinationId }) => {
  const { data: examination, isLoading } = useGetExaminationById(examinationId)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const examinationData = examination?.DT || {}
  //const totalPrice = examinationData.price + examinationData.insuranceCovered

  // Header section with basic info and actions
  const renderHeader = () => (
    <div className="bg-white rounded-lg shadow-sm mb-4 p-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Title level={4} className="!m-0 !text-primary-tw">
              Đơn khám #{examinationData.id}
            </Title>
            {getStatusTag(examinationData.status)}
          </div>
          <Text type="secondary" className="block mt-1">
            Ngày tạo: {formatDate(examinationData.createdAt)}
          </Text>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Statistic
            title="Tổng tiền"
            value={examinationData.price}
            precision={0}
            valueStyle={{ color: "#cf1322" }}
            suffix="₫"
            className="!mr-4"
          />
          {examinationData.paymentData && (
            <div className="flex items-center">
              <Text className="mr-2">Thanh toán:</Text>
              {getPaymentStatusTag(examinationData?.paymentData?.status || 1)}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <Button icon={<Printer size={16} />} className="flex items-center">
          In đơn khám
        </Button>
        <Button icon={<Edit size={16} />} className="flex items-center">
          Chỉnh sửa
        </Button>
        <Button type="primary" style={{ backgroundColor: "#00B5F1" }} className="flex items-center" onClick={() => setIsModalOpen(true)}>
          Xem lịch sử
        </Button>
      </div>
    </div>
  )

  return (
    <>
      <Drawer
        title={
          <div className="flex items-center text-primary-tw">
            <FileText className="mr-2" size={20} />
            <span className="font-bold">Chi tiết đơn khám #{examinationData.id}</span>
          </div>
        }
        placement="right"
        onClose={onClose}
        open={open}
        width={1000}
        footer={
          <div className="flex justify-end">
            <Button onClick={onClose} className="mr-2">
              Đóng
            </Button>
            <Button type="primary" style={{ backgroundColor: "#00B5F1" }} icon={<Printer size={16} />}>
              In đơn khám
            </Button>
          </div>
        }
        headerStyle={{ borderBottom: "1px solid #f0f0f0" }}
        bodyStyle={{ padding: "16px", backgroundColor: "#f5f7fa" }}
      >
        {isLoading ? <Spin /> :
          <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 120px)" }}>
            {renderHeader()}

            {/* Patient Information Section */}
            <Card
              title={
                <div className="flex items-center text-[#00B5F1]">
                  <User className="mr-2" size={18} />
                  <span className="font-bold">Thông tin bệnh nhân</span>
                </div>
              }
              className="mb-4"
              bordered={false}
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Card title="Thông tin cá nhân" bordered={false} className="h-full bg-bgAdmin">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <Text type="secondary">Họ và tên:</Text>
                        <Text strong>
                          {examinationData.userExaminationData.lastName} {examinationData.userExaminationData.firstName}
                        </Text>
                      </div>
                      <div className="flex justify-between">
                        <Text type="secondary">CMND/CCCD:</Text>
                        <Text>{examinationData.userExaminationData.cid}</Text>
                      </div>
                      <div className="flex justify-between">
                        <Text type="secondary">Số điện thoại:</Text>
                        <div className="flex items-center">
                          <Phone size={14} className="mr-1 text-gray-500" />
                          <Text>{examinationData.userExaminationData.phoneNumber || "Không có"}</Text>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <Text type="secondary">Email:</Text>
                        <div className="flex items-center">
                          <Mail size={14} className="mr-1 text-gray-500" />
                          <Text>{examinationData.userExaminationData.email || "Không có"}</Text>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Col>

                <Col xs={24} md={12}>
                  <Card title="Thông tin bảo hiểm" bordered={false} className="h-full bg-bgAdmin">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <Text type="secondary">Mã bảo hiểm:</Text>
                        <Text>{examinationData.insuranceCode || "Không có"}</Text>
                      </div>
                      <div className="flex justify-between">
                        <Text type="secondary">Mức hưởng BHYT:</Text>
                        <Text>
                          {examinationData.insuranceCoverage ? `${examinationData.insuranceCoverage * 20}%` : "Không có"}
                        </Text>
                      </div>
                      <div className="flex justify-between">
                        <Text type="secondary">BHYT chi trả:</Text>
                        <Text className="text-green-600">{formatCurrency(examinationData.insuranceCovered || 0)}</Text>
                      </div>
                      <div className="flex justify-between">
                        <Text type="secondary">Bệnh nhân chi trả:</Text>
                        <Text className="text-blue-600">
                          {formatCurrency(examinationData.coveredPrice || examinationData.price)}
                        </Text>
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>
            </Card>

            {/* Vital Signs Section */}
            <Card
              title={
                <div className="flex items-center text-primary-tw">
                  <Activity className="mr-2" size={18} />
                  <span className="font-bold">Thông tin sinh hiệu</span>
                </div>
              }
              className="mb-4"
              bordered={false}
            >
              {examinationData.examinationVitalSignData ? (
                <Row gutter={[16, 16]}>
                  <Col xs={12} sm={8} md={6} lg={4}>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <Ruler className="text-primary-tw mx-auto mb-1" size={20} />
                      <div className="text-xs text-gray-500">Chiều cao</div>
                      <div className="text-lg font-semibold">{examinationData.examinationVitalSignData.height} cm</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={8} md={6} lg={4}>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <Weight className="text-primary-tw mx-auto mb-1" size={20} />
                      <div className="text-xs text-gray-500">Cân nặng</div>
                      <div className="text-lg font-semibold">{examinationData.examinationVitalSignData.weight} kg</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={8} md={6} lg={4}>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <Heart className="text-primary-tw mx-auto mb-1" size={20} />
                      <div className="text-xs text-gray-500">Mạch</div>
                      <div className="text-lg font-semibold">{examinationData.examinationVitalSignData.pulse} bpm</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={8} md={6} lg={4}>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <Thermometer className="text-primary-tw mx-auto mb-1" size={20} />
                      <div className="text-xs text-gray-500">Nhiệt độ</div>
                      <div className="text-lg font-semibold">{examinationData.examinationVitalSignData.temperature} °C</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={8} md={6} lg={4}>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <Activity className="text-primary-tw mx-auto mb-1" size={20} />
                      <div className="text-xs text-gray-500">Huyết áp</div>
                      <div className="text-lg font-semibold">
                        {examinationData.examinationVitalSignData.hightBloodPressure}/
                        {examinationData.examinationVitalSignData.lowBloodPressure} mmHg
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={8} md={6} lg={4}>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <Lungs className="text-primary-tw mx-auto mb-1" size={20} />
                      <div className="text-xs text-gray-500">Nhịp thở</div>
                      <div className="text-lg font-semibold">
                        {examinationData.examinationVitalSignData.breathingRate} lần/phút
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={8} md={6} lg={4}>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <Droplet className="text-primary-tw mx-auto mb-1" size={20} />
                      <div className="text-xs text-gray-500">Đường huyết</div>
                      <div className="text-lg font-semibold">
                        {examinationData.examinationVitalSignData.glycemicIndex} mg/dL
                      </div>
                    </div>
                  </Col>
                  {examinationData.examinationVitalSignData.fetalWeight && (
                    <Col xs={12} sm={8} md={6} lg={4}>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <Weight className="text-primary-tw mx-auto mb-1" size={20} />
                        <div className="text-xs text-gray-500">Cân nặng thai nhi</div>
                        <div className="text-lg font-semibold">
                          {examinationData.examinationVitalSignData.fetalWeight} g
                        </div>
                      </div>
                    </Col>
                  )}
                </Row>
              ) : (
                <Empty description="Không có dữ liệu sinh hiệu" image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </Card>

            {/* Doctor and Examination Information */}
            <Card
              title={
                <div className="flex items-center text-primary-tw">
                  <Stethoscope className="mr-2" size={18} />
                  <span className="font-bold">Thông tin khám bệnh</span>
                </div>
              }
              className="mb-4"
              bordered={false}
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Card title="Thông tin bác sĩ" bordered={false} className="h-full bg-bgAdmin">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <Text type="secondary">Bác sĩ:</Text>
                        <Text strong>
                          {examinationData.examinationStaffData.staffUserData.lastName}{" "}
                          {examinationData.examinationStaffData.staffUserData.firstName}
                        </Text>
                      </div>
                      <div className="flex justify-between">
                        <Text type="secondary">Chức danh:</Text>
                        <Text>{examinationData.examinationStaffData.position}</Text>
                      </div>
                      <div className="flex justify-between">
                        <Text type="secondary">Khoa:</Text>
                        <div className="flex items-center">
                          <Building size={14} className="mr-1 text-gray-500" />
                          <Text>{examinationData.examinationStaffData.staffDepartmentData.name}</Text>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <Text type="secondary">Phòng khám:</Text>
                        <Text>{examinationData.examinationStaffData.staffDepartmentData.name}</Text>
                      </div>
                      <div className="flex justify-between">
                        <Text type="secondary">Số điện thoại:</Text>
                        <div className="flex items-center">
                          <Phone size={14} className="mr-1 text-gray-500" />
                          <Text>{examinationData.examinationStaffData.staffUserData.phoneNumber}</Text>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <Text type="secondary">Email:</Text>
                        <div className="flex items-center">
                          <Mail size={14} className="mr-1 text-gray-500" />
                          <Text>{examinationData.examinationStaffData.staffUserData.email}</Text>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Col>

                <Col xs={24} md={12}>
                  <Card title="Chi tiết khám bệnh" bordered={false} className="h-full bg-bgAdmin">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <Text type="secondary">Ngày khám:</Text>
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1 text-gray-500" />
                          <Text>{formatDate(examinationData.admissionDate)}</Text>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <Text type="secondary">Triệu chứng:</Text>
                        <div className="flex items-center">
                          <Thermometer size={14} className="mr-1 text-gray-500" />
                          <Text>{examinationData.symptom || "Không có"}</Text>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <Text type="secondary">Chẩn đoán:</Text>
                        <Text strong className="text-right max-w-[250px]">
                          {examinationData.diseaseName || "Chưa có chẩn đoán"}
                        </Text>
                      </div>
                      <div className="flex justify-between">
                        <Text type="secondary">Bệnh đi kèm:</Text>
                        <Text>{examinationData.comorbidities || "Không có"}</Text>
                      </div>
                      <div className="flex justify-between">
                        <Text type="secondary">Ưu tiên:</Text>
                        <Text>{formatSpecialExamination(examinationData?.special)}</Text>
                      </div>
                      <div className="flex justify-between">
                        <Text type="secondary">Loại khám:</Text>
                        <Text>
                          {examinationData?.medicalTreatmentTier === 1
                            ? `Khám bệnh`
                            : "Ngoại trú"}
                        </Text>
                      </div>
                      <div className="flex justify-between">
                        <Text type="secondary">Lý do hủy/vắng mặt:</Text>
                        <Text>{examinationData.reason || "Không có"}</Text>
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>

              {/* Treatment Results */}
              <div className="mt-4">
                <Card title="Kết quả điều trị" bordered={false} className="bg-bgAdmin">
                  {examinationData.treatmentResult ? (
                    <div>
                      <div className="mb-4">
                        <Text type="secondary" className="block mb-1">
                          Kết quả điều trị:
                        </Text>
                        <div className="p-3 bg-white rounded border border-gray-200">{examinationData.treatmentResult}</div>
                      </div>
                      {examinationData.reExaminationDate && (
                        <div className="mb-4">
                          <Text type="secondary" className="block mb-1">
                            Ngày tái khám:
                          </Text>
                          <div className="p-3 bg-white rounded border border-gray-200 flex items-center">
                            <Calendar className="mr-2" size={16} />
                            {formatDate(examinationData.reExaminationDate)}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Empty description="Chưa có kết quả điều trị" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  )}
                </Card>
              </div>
            </Card>

            {/* Payment Information */}
            <Card
              title={
                <div className="flex items-center text-primary-tw">
                  <CreditCard className="mr-2" size={18} />
                  <span className="font-bold">Thông tin thanh toán</span>
                </div>
              }
              className="mb-4"
              bordered={false}
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} md={8}>
                  <Card className="bg-bgAdmin h-full">
                    <Statistic
                      title={
                        <div className="flex items-center">
                          <DollarSign size={14} className="mr-1" />
                          Tổng tiền
                        </div>
                      }
                      value={examinationData.price}
                      precision={0}
                      valueStyle={{ color: "#cf1322" }}
                      suffix="₫"
                    />
                    <div className="mt-2 text-xs text-gray-500">Tổng chi phí khám bệnh</div>
                  </Card>
                </Col>
                <Col xs={24} md={8}>
                  <Card className="bg-bgAdmin h-full">
                    <Statistic
                      title={
                        <div className="flex items-center">
                          <CreditCard size={14} className="mr-1" />
                          BHYT chi trả
                        </div>
                      }
                      value={examinationData.insuranceCovered || 0}
                      precision={0}
                      valueStyle={{ color: "#3f8600" }}
                      suffix="₫"
                    />
                    <div className="mt-2 text-xs text-gray-500">
                      {examinationData.insuranceCoverage
                        ? `Mức hưởng: ${examinationData.insuranceCoverage * 20}%`
                        : "Không có BHYT"}
                    </div>
                  </Card>
                </Col>
                <Col xs={24} md={8}>
                  <Card className="bg-bgAdmin h-full">
                    <Statistic
                      title={
                        <div className="flex items-center">
                          <User size={14} className="mr-1" />
                          Bệnh nhân chi trả
                        </div>
                      }
                      value={examinationData.coveredPrice || examinationData.price}
                      precision={0}
                      valueStyle={{ color: "#1677ff" }}
                      suffix="₫"
                    />
                    <div className="mt-2 text-xs text-gray-500">Số tiền bệnh nhân phải thanh toán</div>
                  </Card>
                </Col>
              </Row>

              <Divider />

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Text strong>Thông tin giao dịch</Text>
                  {getPaymentStatusTag(examinationData?.paymentData?.status || 1)}
                </div>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <div className="space-y-3 bg-bgAdmin p-4 rounded-lg">
                      <div className="flex justify-between">
                        <Text type="secondary">Mã thanh toán:</Text>
                        <Text>#{examinationData?.paymentData?.id}</Text>
                      </div>
                      <div className="flex justify-between">
                        <Text type="secondary">Phương thức thanh toán:</Text>
                        <div>{getPaymentMethodText(examinationData?.paymentData?.paymentMethod || 1)}</div>
                      </div>
                      <div className="flex justify-between">
                        <Text type="secondary">Số tiền thanh toán:</Text>
                        <Text className="text-red-500 font-medium">
                          {formatCurrency(examinationData?.paymentData?.amount)}
                        </Text>
                      </div>
                      <div className="flex justify-between">
                        <Text type="secondary">Ngày thanh toán:</Text>
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1 text-gray-500" />
                          <Text>{formatDate(examinationData.updatedAt)}</Text>
                        </div>
                      </div>
                    </div>
                  </Col>

                  <Col xs={24} md={12}>
                    <div className="bg-bgAdmin p-4 rounded-lg">
                      <Text strong className="block mb-3">
                        Chi tiết chi phí
                      </Text>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Text>Phí khám bệnh:</Text>
                          <Text>{formatCurrency(examinationData.price)}</Text>
                        </div>
                        {examinationData.prescriptionExamData && examinationData.prescriptionExamData.length > 0 && (
                          <div className="flex justify-between">
                            <Text>Tiền thuốc:</Text>
                            <Text>
                              {formatCurrency(
                                examinationData.prescriptionExamData.reduce((sum, p) => sum + p.totalMoney, 0),
                              )}
                            </Text>
                          </div>
                        )}

                        {examinationData.examinationResultParaclincalData &&
                          examinationData.examinationResultParaclincalData.length > 0 && (
                            <div className="flex justify-between">
                              <Text>Xét nghiệm cận lâm sàng:</Text>
                              <Text>
                                {formatCurrency(
                                  examinationData.examinationResultParaclincalData.reduce((sum, p) => sum + p.price, 0),
                                )}
                              </Text>
                            </div>
                          )}
                        <Divider className="my-2" />
                        <div className="flex justify-between font-bold">
                          <Text strong>Tổng cộng:</Text>
                          <Text strong className="text-red-500">
                            {formatCurrency(
                              examinationData.price +
                              (examinationData.prescriptionExamData
                                ? examinationData.prescriptionExamData.reduce((sum, p) => sum + p.totalMoney, 0)
                                : 0) +
                              (examinationData.examinationResultParaclincalData
                                ? examinationData.examinationResultParaclincalData.reduce((sum, p) => sum + p.price, 0)
                                : 0),
                            )}
                          </Text>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Card>

            {/* Prescription Section */}
            <Card
              title={
                <div className="flex items-center text-primary-tw">
                  <Pill className="mr-2" size={18} />
                  <span className="font-bold">Đơn thuốc</span>
                </div>
              }
              className="mb-4"
              bordered={false}
            >
              {examinationData.prescriptionExamData && examinationData.prescriptionExamData.length > 0 ? (
                examinationData.prescriptionExamData.map((prescription, index) => (
                  <Card
                    key={prescription.id}
                    title={
                      <div className="flex items-center">
                        <Pill className="mr-2" size={16} />
                        <span>Đơn thuốc #{prescription.id}</span>
                      </div>
                    }
                    bordered={false}
                    className="mb-4 bg-gray-50"
                    extra={<Tag color="blue">Tổng: {formatCurrency(prescription.totalMoney)}</Tag>}
                  >
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Tên thuốc
                            </th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Liều dùng
                            </th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Số lượng
                            </th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Đơn vị
                            </th>
                            <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Đơn giá
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {prescription.prescriptionDetails.map((medicine) => (
                            <tr key={medicine.id} className="hover:bg-gray-50">
                              <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                                {medicine.name}
                              </td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                                {medicine.PrescriptionDetail.dosage}
                              </td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                                {medicine.PrescriptionDetail.quantity}
                              </td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                                {medicine.PrescriptionDetail.unit}
                              </td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 text-right">
                                {formatCurrency(medicine.price)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {prescription.note && (
                      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                        <div className="flex items-start">
                          <AlertCircle className="mr-2 text-yellow-500 mt-0.5" size={16} />
                          <div>
                            <Text strong>Ghi chú:</Text>
                            <Text className="block">{prescription.note}</Text>
                          </div>
                        </div>
                      </div>
                    )}
                  </Card>
                ))
              ) : (
                <Empty description="Không có đơn thuốc" image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </Card>

            {/* Paraclinical Tests Section */}
            <Card
              title={
                <div className="flex items-center text-primary-tw">
                  <Flask className="mr-2" size={18} />
                  <span className="font-bold">Xét nghiệm cận lâm sàng</span>
                </div>
              }
              className="mb-4"
              bordered={false}
            >
              {examinationData.examinationResultParaclincalData &&
                examinationData.examinationResultParaclincalData.length > 0 ? (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <Text strong>Danh sách xét nghiệm ({examinationData.examinationResultParaclincalData.length})</Text>
                    <Text>
                      Tổng chi phí:{" "}
                      <span className="text-red-500 font-medium">
                        {formatCurrency(
                          examinationData.examinationResultParaclincalData.reduce((sum, p) => sum + p.price, 0),
                        )}
                      </span>
                    </Text>
                  </div>

                  <Collapse defaultActiveKey={["0"]} className="bg-white">
                    {examinationData.examinationResultParaclincalData.map((paraclinical, index) => (
                      <Panel
                        key={index}
                        header={
                          <div className="flex justify-between items-center w-full pr-8">
                            <div className="flex items-center">
                              <Flask size={16} className="mr-2 text-primary-tw" />
                              <Text strong>{paraclinical.paracName}</Text>
                            </div>
                            <div className="flex items-center gap-2">
                              {getParaclinicalStatusTag(paraclinical.status)}
                              <Text className="text-red-500">{formatCurrency(paraclinical.price)}</Text>
                            </div>
                          </div>
                        }
                        className="mb-2 border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <Row gutter={[16, 16]}>
                          <Col xs={24} md={12}>
                            <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                              <div className="flex justify-between">
                                <Text type="secondary">Mã xét nghiệm:</Text>
                                <Text>#{paraclinical.id}</Text>
                              </div>
                              <div className="flex justify-between">
                                <Text type="secondary">Phòng xét nghiệm:</Text>
                                <Text>{paraclinical.roomParaclinicalData.name}</Text>
                              </div>
                              <div className="flex justify-between">
                                <Text type="secondary">Khoa:</Text>
                                <Text>{paraclinical.doctorParaclinicalData.staffDepartmentData.name}</Text>
                              </div>
                              <div className="flex justify-between">
                                <Text type="secondary">Bác sĩ thực hiện:</Text>
                                <Text>
                                  {paraclinical.doctorParaclinicalData.staffUserData.lastName}{" "}
                                  {paraclinical.doctorParaclinicalData.staffUserData.firstName}
                                </Text>
                              </div>
                              <div className="flex justify-between">
                                <Text type="secondary">Ngày thực hiện:</Text>
                                <div className="flex items-center">
                                  <Calendar size={14} className="mr-1 text-gray-500" />
                                  <Text>{formatDate(paraclinical.createdAt)}</Text>
                                </div>
                              </div>
                            </div>
                          </Col>

                          <Col xs={24} md={12}>
                            <div className="bg-gray-50 p-4 rounded-lg h-full">
                              {paraclinical.result || paraclinical.description || paraclinical.image ? (
                                <div className="space-y-3">
                                  {paraclinical.result && (
                                    <div>
                                      <Text strong className="block mb-1">
                                        Kết quả:
                                      </Text>
                                      <div className="p-2 bg-white rounded border border-gray-200">
                                        {paraclinical.result}
                                      </div>
                                    </div>
                                  )}

                                  {paraclinical.description && (
                                    <div>
                                      <Text strong className="block mb-1">
                                        Mô tả:
                                      </Text>
                                      <div className="p-2 bg-white rounded border border-gray-200">
                                        {paraclinical.description}
                                      </div>
                                    </div>
                                  )}

                                  {paraclinical.image && (
                                    <div>
                                      <Text strong className="block mb-1">
                                        Hình ảnh:
                                      </Text>
                                      <div className="p-2 bg-white rounded border border-gray-200">
                                        <img
                                          src={paraclinical.image || "/placeholder.svg"}
                                          alt="Kết quả xét nghiệm"
                                          className="max-w-full h-auto rounded"
                                        />
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div className="flex items-center justify-center h-full">
                                  <Empty description="Chưa có kết quả" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                </div>
                              )}
                            </div>
                          </Col>
                        </Row>
                      </Panel>
                    ))}
                  </Collapse>
                </div>
              ) : (
                <Empty description="Không có dữ liệu cận lâm sàng" image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </Card>
          </div>}
      </Drawer>

      {!isLoading && (
        <div className="modal-history-content">
          <HistoryModal
            isModalOpen={isModalOpen}
            handleCancel={() => setIsModalOpen(false)}
            userId={examinationData?.userExaminationData?.id}
          />
        </div>
      )}
    </>
  )
}

export default ExaminationDrawer
