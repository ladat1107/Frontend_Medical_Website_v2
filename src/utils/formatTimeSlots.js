import { TIMESLOTS } from "@/constant/value";

export const getTimeSlotById = (id) => {
    const slot = TIMESLOTS.find(slot => slot.id === id);
    return slot ? slot.value : "Không tìm thấy khung giờ";
}