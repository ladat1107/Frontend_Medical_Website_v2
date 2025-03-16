import NotiItem from '../NotiItem/notiItem'
import './ViewNoti.scss'

const ViewNoti = () => {

    let noti = {
        title: 'Title',
        time: '10 phút trước',
        doctor: 'Bác sĩ: Nguyễn Văn A',
        content: 'Content',
    }

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