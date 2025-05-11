"use client"

import { useState, useEffect } from "react"
import { Tabs, Card, Statistic, Row, Col, message } from "antd"
import { CalendarOutlined, FileTextOutlined, ClockCircleOutlined, CheckCircleOutlined } from "@ant-design/icons"
import ExaminationList from "./ExaminationList"
import AppointmentList from "./AppointmentList"
import ExaminationStats from "./ExaminationStats"
import { SquareMenu } from "lucide-react"
import { useGetExamination } from "@/hooks"
import { STATUS_BE } from "@/constant/value"
const { TabPane } = Tabs

const ExaminationDashboard = () => {
  const { data: examinationData } = useGetExamination();
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState("1")
  const [stats, setStats] = useState({
    totalExaminations: 0,
    pendingExaminations: 0,
    completedExaminations: 0,
    upcomingAppointments: 0,
  })

  useEffect(() => {
    if (examinationData?.EC === 0 && examinationData?.DT) {
      const examinations = (examinationData?.DT);
      let _appointments = [];
      let totalExaminations = 0;
      let pendingExaminations = 0;
      let completedExaminations = 0;
      let upcomingAppointments = 0;
      let cancelExaminations = 0;

      examinations.forEach(examination => {
        if ((new Date(examination.admissionDate) > new Date()) && examination.is_appointment) {
          upcomingAppointments += 1;
          _appointments.push(examination);
        } else if (examination.status === STATUS_BE.DONE || examination.status === STATUS_BE.DONE_INPATIENT) {
          completedExaminations += 1;
          totalExaminations += 1;
        } else if (examination.status === STATUS_BE.INACTIVE) {
          cancelExaminations += 1;
        } else if (examination.status === STATUS_BE.PENDING || examination.status === STATUS_BE.WAITING || examination.status === STATUS_BE.PAID || examination.status === STATUS_BE.EXAMINING) {
          pendingExaminations += 1;
          totalExaminations += 1;
        }
      })

      setStats({
        totalExaminations: totalExaminations,
        pendingExaminations: pendingExaminations,
        completedExaminations: completedExaminations,
        upcomingAppointments: upcomingAppointments,
      })

      setAppointments(_appointments);
    }
  }, [examinationData])

  return (
    <div className="p-4 bg-bgAdmin min-h-screen">
      <div className="flex items-center gap-2">
        <SquareMenu className="text-secondaryText-tw" />
        <span className="text-secondaryText-tw text-[18px] uppercase">Quản lý đơn khám bệnh & lịch hẹn</span>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} className="mb-6 mt-4">
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="!shadow-table-admin rounded-xl  [&_.ant-card-body]:px-6 [&_.ant-card-body]:py-4">
            <Statistic
              title="Tổng đơn khám"
              value={stats.totalExaminations}
              prefix={<FileTextOutlined style={{ color: "#00B5F1" }} />}
              valueStyle={{ color: "#00B5F1" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="!shadow-table-admin rounded-xl  [&_.ant-card-body]:px-6 [&_.ant-card-body]:py-4">
            <Statistic
              title="Đơn hoàn thành"
              value={stats.completedExaminations}
              prefix={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="!shadow-table-admin rounded-xl  [&_.ant-card-body]:px-6 [&_.ant-card-body]:py-4">
            <Statistic
              title="Đơn chờ xử lý"
              value={stats.pendingExaminations}
              prefix={<ClockCircleOutlined style={{ color: "#faad14" }} />}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} className="!shadow-table-admin rounded-xl  [&_.ant-card-body]:px-6 [&_.ant-card-body]:py-4">
            <Statistic
              title="Lịch hẹn sắp tới"
              value={stats.upcomingAppointments}
              prefix={<CalendarOutlined style={{ color: "#722ed1" }} />}
              valueStyle={{ color: "#722ed1" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Main Content Tabs */}
      <Card className="!shadow-table-admin rounded-xl [&_.ant-card-body]:px-6 [&_.ant-card-body]:py-4 ">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          type="card"
          tabBarStyle={{ marginBottom: "16px", fontWeight: "bold" }}
        >
          <TabPane
            tab={
              <span className={`flex items-center gap-2 hover:text-primary-tw ${activeTab === "1" ? "!text-primary-tw" : ""}`} >
                <FileTextOutlined />
                Danh sách đơn khám
              </span>
            }
            key="1"
          >
            <ExaminationList examinationList={examinationData?.DT || []} />
          </TabPane>
          <TabPane
            tab={
              <span className={`flex items-center gap-2 hover:text-primary-tw ${activeTab === "2" ? "!text-primary-tw" : ""}`} >
                <CalendarOutlined />
                Lịch hẹn
              </span>
            }
            key="2"
          >
            <AppointmentList appointmentList={appointments} />
          </TabPane>
          <TabPane
            tab={
              <span className={`flex items-center gap-2 hover:text-primary-tw ${activeTab === "4" ? "!text-primary-tw" : ""}`} >
                <FileTextOutlined />
                Thống kê
              </span>
            }
            key="4"
          >
            <ExaminationStats />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  )
}

export default ExaminationDashboard
