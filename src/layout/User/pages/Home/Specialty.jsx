import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './home.module.scss';
import useQuery from '@/hooks/useQuery';
import userService from '@/services/userService';
import { Skeleton } from 'antd';

// Tạo instance của classnames với bind styles
const cx = classNames.bind(styles);

const Specialty = () => {
  const { data: specialtyData, loading } = useQuery(() =>
    userService.getSpecialty()
  );
  const listSpecialty = specialtyData?.DT || [];
  const [showAll, setShowAll] = useState(false);

  const itemsToShow = showAll ? listSpecialty : listSpecialty.slice(0, 16);

  return (
    <div className={cx('specialty')}>
      <h2 className={cx('specialty-title', 'title-section')}>Chuyên Khoa</h2>
      <div className={cx('specialty-list')}>
        {
          loading ? Array.from({ length: 16 }).map((_, index) => (
            <div key={index} className={cx('specialty-item')}>
              <Skeleton.Avatar active size={100} shape="circle" style={{ width: "100%", height: "100%" }} />
              <Skeleton.Input style={{ width: 100 }} active size="small" />
            </div>
          )) :
            itemsToShow.map((item, index) => (
              <div key={index} className={cx('specialty-item')}>
                <img src={item.image} alt="" />
                <p className="text mt-3">{item.name}</p>
              </div>
            ))}
      </div>
      {!loading && listSpecialty.length > 0 && (
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
