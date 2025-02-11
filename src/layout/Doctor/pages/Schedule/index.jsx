import { useState } from 'react';
import './Schedule.scss';
import CustomCalendar from './Calendar';

const Schedule = () => {

    const [selectedRadio, setSelectedRadio] = useState('week');

    const handleRadioChange = (e) => {
        setSelectedRadio(e.target.value);
    };

    return (
        <div className='schedule-container'>
            <div className="row">
                <div className="col-6">
                    <h1>Lịch trực</h1>
                </div>
            </div>
            <hr/>
            <div className='row'>
                <div className='calendar-content'>
                    <CustomCalendar />
                </div>
            </div>
        </div>
    )
}

export default Schedule;