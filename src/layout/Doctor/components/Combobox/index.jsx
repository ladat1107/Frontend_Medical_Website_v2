import React from 'react';
import PropTypes from 'prop-types';
import './SelectBox.scss'; 

const SelectBox = ({ options, value, onChange, placeholder }) => {
  return (
    <div className="select-box">
      <select value={value} onChange={onChange} className="select">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

SelectBox.propTypes = {
  options: PropTypes.array.isRequired,  // Danh sách các tùy chọn
  value: PropTypes.string.isRequired,    // Giá trị hiện tại của Select Box
  onChange: PropTypes.func.isRequired,   // Hàm gọi khi giá trị thay đổi
  placeholder: PropTypes.string,          // Placeholder cho Select Box
};

export default SelectBox;
