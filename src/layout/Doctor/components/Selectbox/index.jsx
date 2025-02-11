import React from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import './SelectBox.scss';

const SelectBox2 = ({ placeholder, options, value, onChange }) => (
  <Select
    showSearch
    style={{
      width: 200,
    }}
    placeholder={placeholder}
    optionFilterProp="label"
    filterSort={(optionA, optionB) =>
      (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
    }
    options={options}
    value={value}
    onChange={onChange} 
  />
);

SelectBox2.propTypes = {
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired, 
    value: PropTypes.any.isRequired, 
    price: PropTypes.number,       
    unit: PropTypes.string,         
  })).isRequired, 
  value: PropTypes.any,
  onChange: PropTypes.func,  
};

export default SelectBox2;
