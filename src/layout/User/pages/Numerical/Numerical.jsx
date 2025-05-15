// client/src/pages/Numerical.jsx - Cập nhật

import Loading from "@/components/Loading/Loading";
import { useEffect, useState, useCallback } from "react";
import userService from "@/services/userService";
import { useMutation } from "@/hooks/useMutation";
import { useSelector } from "react-redux";

const Numerical = () => {
    const [currentNumber, setCurrentNumber] = useState({});
    const [loading, setLoading] = useState(false);
    const { token } = useSelector((state) => state.authen);

    // Setup data fetching
    const {
        data: ticketData,
        execute: fetchTicketData,
        loading: fetchLoading
    } = useMutation((query) => userService.getTicket());

    // Kết nối socket và thiết lập listeners
    useEffect(() => {
        fetchTicketData();
    }, []);

    useEffect(() => {
        if (ticketData) {
            setCurrentNumber(ticketData?.DT[0]);
        }
    }, [ticketData]);


    return (
        <div className="get-number-bg">
            {loading && (
                <div className="loading-overlay">
                    <Loading />
                </div>
            )}
            <div className={`content ${loading ? "disabled" : ""}`}>
                <h1 className="get-number-title">Số thứ tự khám bệnh</h1>
                <div className="btn-group">
                    <button className="get-number-btn priority">
                        <div>Số ưu tiên</div>
                        <div>({currentNumber?.priorityNumberCurrent || 0})</div>
                    </button>
                    <button className="get-number-btn normal">
                        <div>Số thường</div>
                        <div>({currentNumber?.normalNumberCurrent || 0})</div>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Numerical;