import NotiItem from '../NotiItem/notiItem'
import './ViewNoti.scss'

const ViewNoti = () => {

    let noti = {
        title: "Cập nhật quy trình làm việc và thông tin quan trọng",
        time: "10 phút trước",
        doctor: "Bác sĩ: Nguyễn Văn A",
        content: `Kính gửi toàn thể nhân viên,\n\n
                    Nhằm nâng cao hiệu quả làm việc, đảm bảo chất lượng phục vụ và tối ưu hóa quy trình nội bộ, công ty xin thông báo một số nội dung quan trọng như sau:\n\n
                    1️⃣ Cập nhật quy trình làm việc:\n\n
                    - Từ ngày 01/12/2024, tất cả nhân viên phải tuân thủ quy trình mới theo hướng dẫn được gửi qua email.\n
                    - Quy trình mới sẽ giúp giảm thiểu sai sót và nâng cao trải nghiệm của khách hàng.\n\n
                    2️⃣ Thay đổi thời gian làm việc:\n\n
                    - Giờ làm việc từ Thứ Hai đến Thứ Sáu: 08:00 - 17:30.\n
                    - Nghỉ trưa từ 12:00 - 13:30.\n
                    - Đối với bộ phận hỗ trợ khách hàng, lịch làm việc có thể thay đổi và sẽ được thông báo riêng.\n\n
                    3️⃣ Cập nhật hệ thống phần mềm:\n\n
                    - Từ 00:00 đến 04:00 ngày 05/12/2024, hệ thống sẽ được bảo trì.\n
                    - Trong thời gian này, có thể xảy ra gián đoạn, vui lòng hoàn thành các công việc quan trọng trước thời điểm này.\n\n
                    4️⃣ Quy định mới về báo cáo công việc:\n\n
                    - Nhân viên phải nộp báo cáo công việc hàng tuần trước 17:00 thứ Sáu.\n
                    - Sử dụng biểu mẫu mới để đồng bộ dữ liệu và tăng tính chính xác.\n\n
                    🔹 Đề nghị toàn thể nhân viên nghiêm túc thực hiện và theo dõi thông tin từ quản lý trực tiếp. Nếu có thắc mắc, vui lòng liên hệ phòng Hành chính – Nhân sự để được giải đáp.\n\n
                    Trân trọng,\n
                    Ban Quản Lý`
    };

    return (
        <div className="view-noti-container">
            <p className="date">Hôm nay</p>
            <div className='list-noti'>
                <NotiItem noti={noti}/>
                <NotiItem noti={noti}/>
            </div>
        </div>
    )
}

export default ViewNoti