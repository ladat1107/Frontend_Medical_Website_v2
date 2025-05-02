import React from "react";
import { Modal, Table } from "antd";

const columns = [
    {
        title: "STT",
        dataIndex: "stt",
        key: "stt",
        width: 60,
    },
    {
        title: "Nội dung chi phí",
        dataIndex: "content",
        key: "content",
    },
    {
        title: "Đơn vị tính",
        dataIndex: "unit",
        key: "unit",
    },
    {
        title: "Số lượng",
        dataIndex: "quantity",
        key: "quantity",
    },
    {
        title: "Đơn giá (đ)",
        dataIndex: "unitPrice",
        key: "unitPrice",
        render: (text) => text.toLocaleString(),
    },
    {
        title: "Thành tiền (đ)",
        dataIndex: "total",
        key: "total",
        render: (text) => text.toLocaleString(),
    },
    {
        title: "Tỷ lệ BHYT (%)",
        dataIndex: "insuranceRate",
        key: "insuranceRate",
    },
    {
        title: "BHYT thanh toán (đ)",
        dataIndex: "insurancePaid",
        key: "insurancePaid",
        render: (text) => text.toLocaleString(),
    },
    {
        title: "Người bệnh trả (đ)",
        dataIndex: "patientPaid",
        key: "patientPaid",
        render: (text) => text.toLocaleString(),
    },
];

const SummaryModal = ({ open, onCancel, examinationData }) => {
    const data = [];
    let stt = 1;

    // Tổng hợp chi phí thuốc
    examinationData?.prescriptionExamData?.forEach((prescription) => {
        prescription.prescriptionDetails.forEach((item) => {
        const detail = item.PrescriptionDetail;
        const quantity = detail.quantity || 1;
        const unitPrice = detail.price || 0;
        const total = quantity * unitPrice;
        const insuranceRate = detail.insuranceCovered
            ? Math.round((detail.insuranceCovered / total) * 100)
            : 0;
        const insurancePaid = detail.insuranceCovered || 0;
        const patientPaid = total - insurancePaid;

        data.push({
            stt: stt++,
            content: item.name,
            unit: detail.unit,
            quantity,
            unitPrice,
            total,
            insuranceRate,
            insurancePaid,
            patientPaid,
        });
        });
    });

    // TODO: Thêm dữ liệu cận lâm sàng và tiền phòng vào đây tương tự như phần thuốc
  

    return (
        <Modal
            open={open}
            title="Tổng hợp chi phí khám chữa bệnh"
            onCancel={onCancel}
            footer={null}
            width={1000}
        >
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                rowKey={(record) => `${record.stt}-${record.content}`}
            />
        </Modal>
    );
};

export default SummaryModal;