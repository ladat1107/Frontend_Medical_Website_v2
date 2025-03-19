import { Skeleton } from 'antd';

const DoctorCardSkelethon = () => {
    return (
        <div className="doctor-card doctor-card--skeleton w-100">
            <Skeleton.Avatar active size={80} style={{ width: "150px", height: "150px" }} shape="circle" />
            <Skeleton.Input active size="small" className="doctor-card__name" style={{ width: '60%' }} />
            <div className="doctor-card__info w-100">
                <Skeleton.Input active size="small" className="doctor-card__specialty" style={{ width: '100%' }} />
                <div className="doctor-card__details w-100">
                    <Skeleton.Input active size="small" className="doctor-card__price" style={{ width: '100%' }} />
                    <Skeleton.Input active size="small" className="doctor-card__visits" style={{ width: '100%' }} />
                    <Skeleton.Input active size="small" className="doctor-card__rating" style={{ width: '100%' }} />
                </div>
            </div>
            <Skeleton.Button active size="small" style={{ width: '100%' }} />
        </div>
    );
}
export default DoctorCardSkelethon;