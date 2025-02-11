export function convertStartDateToTimestamp(dateString) {
    // Tạo đối tượng Date từ chuỗi ngày
    const dateObject = new Date(dateString);
    dateObject.setHours(0, 0, 0, 0);
    
    // Trả về giá trị timestamp (tính bằng giây)
    return Math.floor(dateObject.getTime());
}

export function convertEndDateToTimestamp(dateString) {
    // Tạo đối tượng Date từ chuỗi ngày
    const dateObject = new Date(dateString);
    dateObject.setHours(23, 59, 59, 999);
    
    // Trả về giá trị timestamp (tính bằng giây)
    return Math.floor(dateObject.getTime());
}

export function convertDateTime(dateString) {
    const dateObject = new Date(dateString);
    return Math.floor(dateObject.getTime());
}