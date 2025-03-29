import React, { useState, useEffect } from 'react'
import NotiItem from '../NotiItem/notiItem'
import './ViewNoti.scss'
import PropTypes from 'prop-types'
import socket from '@/Socket/socket'

const ViewNoti = ({ initialNotifications = { count: 0, rows: [] } }) => {
    const [notifications, setNotifications] = useState(initialNotifications)
    const [todayNotifications, setTodayNotifications] = useState([])
    const [earlierNotifications, setEarlierNotifications] = useState([])

    useEffect(() => {
        // Cập nhật state ban đầu
        setNotifications(initialNotifications)
    }, [initialNotifications])

    useEffect(() => {
        // Xử lý khi nhận được thông báo mới từ socket
        const handleNewNotification = (data) => {

            const newNotification = {
                title: data.title,
                status: 1,
                htmlDescription: data.htmlDescription,
                date: data.date,
                NotificationSenderData: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                },
                NotificationAttachFileData: {
                    link: data.link,
                    type: data.type,
                }
            }

            setNotifications(prev => {
                const updatedRows = [newNotification, ...prev.rows]
                return {
                    count: updatedRows.length,
                    rows: updatedRows
                }
            })
        }

        // Đăng ký lắng nghe sự kiện thông báo
        socket.on("notification", handleNewNotification)

        // Hủy đăng ký khi component unmount
        return () => {
            socket.off("notification", handleNewNotification)
        }
    }, [])

    useEffect(() => {
        // Phân loại thông báo theo ngày
        const today = new Date().toDateString()

        const todayNoti = notifications.rows.filter(noti => {
            const createdDate = noti.createdAt || noti.date
            const notiDate = new Date(createdDate).toDateString()
            return notiDate === today
        })

        const earlierNoti = notifications.rows.filter(noti => {
            const createdDate = noti.createdAt || noti.date
            const notiDate = new Date(createdDate).toDateString()
            return notiDate !== today
        })

        setTodayNotifications(todayNoti)
        setEarlierNotifications(earlierNoti)
    }, [notifications])

    return (
        <div className="notification-container">
            {notifications.count === 0 ? (
                <p className="no-notifications">Không có thông báo nào</p>
            ) : (
                <>
                    {todayNotifications.length > 0 && (
                        <>
                            <p className="date">Hôm nay</p>
                            <div className='list-noti'>
                                {todayNotifications.map((noti) => (
                                    <NotiItem key={noti.id} noti={noti} />
                                ))}
                            </div>
                        </>
                    )}

                    {earlierNotifications.length > 0 && (
                        <>
                            <p className="date">Trước đó</p>
                            <div className='list-noti'>
                                {earlierNotifications.map((noti) => (
                                    <NotiItem key={noti.id} noti={noti} />
                                ))}
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    )
}

ViewNoti.propTypes = {
    initialNotifications: PropTypes.shape({
        count: PropTypes.number,
        rows: PropTypes.array
    })
}

export default ViewNoti