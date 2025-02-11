import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS cho DatePicker
import PropTypes from 'prop-types';
import './DatePicker.scss'; // Để thêm style nếu cần

const CustomDatePicker = ({ selectedDate, onDateChange, placeholder }) => {
  return (
    <div className="date-picker">
      <DatePicker
        selected={selectedDate}
        onChange={onDateChange}
        placeholderText={placeholder}
        className="input-date"
        dateFormat="dd/MM/yyyy" // Định dạng hiển thị ngày
      />
    </div>
  );
};

CustomDatePicker.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired, // Ngày được chọn
  onDateChange: PropTypes.func.isRequired,              // Hàm gọi khi ngày thay đổi
  placeholder: PropTypes.string,                          // Placeholder cho DatePicker
};

export default CustomDatePicker;
