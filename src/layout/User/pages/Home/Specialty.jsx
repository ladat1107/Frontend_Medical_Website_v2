import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './home.module.scss';
import useQuery from '@/hooks/useQuery';
import userService from '@/services/userService';

// Tạo instance của classnames với bind styles
const cx = classNames.bind(styles);

const Specialty = () => {
  const { data: specialtyData, error: specialtyError } = useQuery(() =>
    userService.getSpecialty()
  );

  const listSpecialty = specialtyData?.DT || [];


  const [showAll, setShowAll] = useState(false);

  const itemsToShow = showAll ? listSpecialty : listSpecialty.slice(0, 16);

  return (
    <div className={cx('specialty')}>
      <h2 className={cx('specialty-title', 'title-section')}>Chuyên Khoa</h2>
      <div className={cx('specialty-list')}>
        {itemsToShow.map((item, index) => (
          <div key={index} className={cx('specialty-item')}>
            <img src={item.image} alt="" />
            <p className="text mt-3">{item.name}</p>
          </div>
        ))}
      </div>
      {listSpecialty.length > 0 && (
        <div className={cx('show-more-container')}>
          <button
            className={cx('show-more-btn')}
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? 'Show Less' : 'Show More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Specialty;
