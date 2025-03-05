import React from 'react';
import PropTypes from 'prop-types';
import './SelectBox.scss'; 

const SelectBox = ({ options, value, onChange, placeholder, disabled }) => {
  return (
    <div className="select-box">
      <select 
        value={value} 
        onChange={onChange} 
        className="select"
        disabled={disabled} // Chặn chọn nếu disabled = true
      >
        {placeholder && <option value="">{placeholder}</option>}
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
  options: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool, // Thêm prop disabled
};

export default SelectBox;
