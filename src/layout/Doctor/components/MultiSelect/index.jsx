import React from 'react';
import PropTypes from 'prop-types';
import { Select, Space } from 'antd';
import './MultiSelect.scss';

const MultiSelect = ({ options, placeholder, onChange, value }) => {
  const handleChange = (selectedValues) => {
    console.log(`selected ${selectedValues}`);
    onChange(selectedValues); 
  };

  return (
    <Space
      className="multi-select-container"
      style={{
        width: '100%'
      }}
      direction="vertical"
    >
      <Select
        mode="multiple"
        allowClear
        style={{
          width: '100%',
        }}
        placeholder={placeholder}
        value={value} 
        onChange={handleChange}
        options={options}
      />
    </Space>
  );
};

MultiSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.array,
};

export default MultiSelect;
