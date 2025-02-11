import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './QuantityInput.scss';

const QuantityInput = ({ initialValue, min = 1, max = 100, step = 1, onChange }) => {
  const [value, setValue] = useState(initialValue || min);

  const handleIncrement = () => {
    const newValue = Math.min(value + step, max);
    setValue(newValue);
    onChange && onChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(value - step, min);
    setValue(newValue);
    onChange && onChange(newValue);
  };

  const handleInputChange = (e) => {
    const inputValue = parseInt(e.target.value, 10);
    if (!isNaN(inputValue) && inputValue >= min && inputValue <= max) {
      setValue(inputValue);
      onChange && onChange(inputValue);
    }
  };

  return (
    <div className="quantity-input">
      <i onClick={handleDecrement} className="fa-solid fa-minus button-style"></i>
      <input
        value={value}
        onChange={handleInputChange}
        className="input"
        style={{ margin: '0px' }}
        min={min}
        max={max}
        step={step}
      />
      <i onClick={handleIncrement} className="fa-solid fa-plus button-style"></i>
    </div>
  );
};

QuantityInput.propTypes = {
  initialValue: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  onChange: PropTypes.func
};

export default QuantityInput;