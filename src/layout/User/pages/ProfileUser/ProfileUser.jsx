import Container from "@/components/Container";
import Profile from "@/components/Profile/Profile";
import "./ProfileUser.scss";
import emitter from "@/utils/eventEmitter";
import { EMIT } from "@/constant/value";
import { useEffect, useState } from "react";
import HistoryModal from "@/layout/Doctor/components/HistoryModal/HistoryModal";
import { useSelector } from "react-redux";

const ProfileUser = () => {

    let { user } = useSelector(state => state.authen);
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        if (isModalOpen) {
            if (isModalOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'unset';
            }

            return () => {
                document.body.style.overflow = 'unset';
            };
        }
    }, [isModalOpen]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div className="profile-user">
            <div className="header-profile-user">
                <div className="btn-profile-user" onClick={() => { emitter.emit(EMIT.EVENT_PROFILE.key, EMIT.EVENT_PROFILE.info) }}>
                    Thông tin cá nhân
                </div>
                <div className="btn-profile-user" onClick={() => { emitter.emit(EMIT.EVENT_PROFILE.key, EMIT.EVENT_PROFILE.changePassword) }}>
                    Đổi mật khẩu
                </div>
                <div className="btn-profile-user" onClick={showModal}>
                    Lịch sử khám bệnh
                </div>
            </div>
            <Profile />
            <div className="modal-history-content">
                <HistoryModal
                    isModalOpen={isModalOpen}
                    handleCancel={handleCancel}
                />
            </div>
        </div>
    );
};
export default ProfileUser;