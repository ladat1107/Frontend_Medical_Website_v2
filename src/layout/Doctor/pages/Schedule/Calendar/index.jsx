import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import isToday from 'date-fns/isToday';
import PropTypes from 'prop-types';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import viVN from 'date-fns/locale/vi';
import { Modal, Form, Input, DatePicker, Button, message } from 'antd';
import moment from 'moment';
import './Calendar.scss';
import { useMutation } from '@/hooks/useMutation';
import { getScheduleByStaffId } from '@/services/doctorService';
import { useSelector } from 'react-redux';

const locales = {
    'vi': viVN,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const CustomToolbar = ({ onNavigate, date, onView }) => {
    const goToBack = () => {
        onNavigate('PREV');
    };

    const goToNext = () => {
        onNavigate('NEXT');
    };

    const goToToday = () => {
        onNavigate('TODAY');
    };

    const label = () => {
        const dateObj = moment(date);
        return (
            <span>
                <b>{`Tháng ${dateObj.format('MM')} / ${dateObj.format('YYYY')}`}</b>
            </span>
        );
    };

    return (
        <div className="rbc-toolbar">
            <span className="rbc-toolbar-label text-start">{label()}</span>
            <span className="rbc-btn-group">
                <button type="button" onClick={goToBack}>Trước</button>
                <button type="button" onClick={goToToday}>Hôm nay</button>
                <button type="button" onClick={goToNext}>Sau</button>
            </span>
        </div>
    );
};

CustomToolbar.propTypes = {
    onNavigate: PropTypes.func.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    onView: PropTypes.func.isRequired
};

const messages = {
    today: 'Hôm nay',
    previous: 'Trước',
    next: 'Sau',
    month: 'Tháng',
    week: 'Tuần',
    day: 'Ngày',
    agenda: 'Lịch biểu',
    date: 'Ngày',
    time: 'Thời gian',
    event: 'Sự kiện',
    allDay: 'Cả ngày',
    noEventsInRange: 'Không có sự kiện nào trong khoảng thời gian này',
};

const CustomCalendar = () => {
    let { user } = useSelector((state) => state.authen);
    const [events, setEvents] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [form] = Form.useForm();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [listSchedule, setListSchedule] = useState([]);

    const {
        data: scheduleData,
        loading: scheduleLoading,
        error: scheduleError,
        execute: fetchSchedule,
    } = useMutation(() => getScheduleByStaffId(user.staff));

    useEffect(() => {
        fetchSchedule();
    }, []);

    // Thêm sự kiện vào Calendar từ dữ liệu scheduleData
    useEffect(() => {
        if (scheduleData?.DT) {
            const formattedEvents = scheduleData.DT.map((item) => ({
                id: item.roomId + item.date,
                title: item.scheduleRoomData.name,
                start: new Date(item.date),
                end: new Date(item.date),
            }));
            setEvents(formattedEvents);
        }
    }, [scheduleData]);


    const handleSelect = ({ start, end }) => {
        const selectedMonth = moment(start).month();
        const currentMonth = moment(currentDate).month();
        const selectedYear = moment(start).year();
        const currentYear = moment(currentDate).year();
    
        if (selectedMonth !== currentMonth || selectedYear !== currentYear) {
            message.warning('Không thể thêm sự kiện ngoài tháng hiện tại!');
            return;
        }
    
        setSelectedEvent(null);
        form.resetFields();
        form.setFieldsValue({
            start: moment(start),
            end: moment(end),
        });
        setIsModalVisible(true);
    };

    const filteredEvents = events.filter(event => {
        const eventDate = moment(event.start);
        return (
            eventDate.month() === moment(currentDate).month() &&
            eventDate.year() === moment(currentDate).year()
        );
    });

    // Xử lý khi click vào một sự kiện
    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
        form.setFieldsValue({
            title: event.title,
            description: event.description,
            start: moment(event.start),
            end: moment(event.end),
        });
        setIsModalVisible(true);
    };

    const handleNavigate = (newDate) => {
        setCurrentDate(newDate);
    };

    const handleSubmit = (values) => {
        const newEvent = {
            id: selectedEvent ? selectedEvent.id : Date.now(),
            title: values.title,
            description: values.description,
            start: values.start.toDate(),
            end: values.end.toDate(),
        };

        if (selectedEvent) {
            setEvents(events.map(event => 
                event.id === selectedEvent.id ? newEvent : event
            ));
            message.success('Cập nhật sự kiện thành công!');
        } else {
            setEvents([...events, newEvent]);
            message.success('Thêm sự kiện thành công!');
        }

        setIsModalVisible(false);
        form.resetFields();
    };

    const handleDelete = () => {
        if (selectedEvent) {
            setEvents(events.filter(event => event.id !== selectedEvent.id));
            message.success('Xóa sự kiện thành công!');
            setIsModalVisible(false);
            form.resetFields();
        }
    };

    const eventPropGetter = (event) => {
        const isTodayEvent = isToday(event.start);
        return {
            style: {
                border: isTodayEvent ? '1.5px solid #3aa472' : '',
                color: isTodayEvent ? '#3aa472' : '',
            },
        };
    };

    return (
        <div style={{ height: '700px' }}>
            <Calendar
                className='custom-calendar'
                localizer={localizer}
                events={filteredEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%' }}
                selectable
                // onSelectSlot={handleSelect}
                // onSelectEvent={handleSelectEvent}
                messages={messages}
                onNavigate={handleNavigate}
                components={{
                    toolbar: CustomToolbar
                }}
                eventPropGetter={eventPropGetter}
            />

            <Modal
                title={selectedEvent ? "Cập nhật sự kiện" : "Thêm sự kiện mới"}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    layout="vertical"
                >
                    <Form.Item
                        name="title"
                        label="Tiêu đề"
                        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Mô tả"
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item
                        name="start"
                        label="Thời gian bắt đầu"
                        rules={[{ required: true, message: 'Vui lòng chọn thời gian bắt đầu!' }]}
                    >
                        <DatePicker
                            showTime
                            format="DD/MM/YYYY HH:mm"
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="end"
                        label="Thời gian kết thúc"
                        rules={[{ required: true, message: 'Vui lòng chọn thời gian kết thúc!' }]}
                    >
                        <DatePicker
                            showTime
                            format="DD/MM/YYYY HH:mm"
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                    <Form.Item>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button type="primary" htmlType="submit">
                                {selectedEvent ? 'Cập nhật' : 'Thêm mới'}
                            </Button>
                            {selectedEvent && (
                                <Button danger onClick={handleDelete}>
                                    Xóa
                                </Button>
                            )}
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default CustomCalendar;
