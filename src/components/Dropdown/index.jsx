import React, { useState, useRef, useEffect } from 'react';
import { Menu, MenuItem, Button, ListItemIcon } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import classNames from 'classnames/bind';
import styles from './dropdown.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const Dropdown = ({ trigger, menu, className }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cx('dropdown', className)} ref={dropdownRef}>
      <div onClick={() => setOpen(!open)}>
        {trigger}
      </div>
      {open && (
        <div className={cx('menu')}>
          {menu}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
