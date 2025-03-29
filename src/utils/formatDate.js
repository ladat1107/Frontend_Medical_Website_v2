export function convertDateTime(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${formattedDay}/${formattedMonth}/${year}`;
}

export function convertDateTimeToString(isoString) {
  const date = new Date(isoString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${formattedDay}, tháng ${formattedMonth}, ${year}`;
}

export function convertToDate(isoString) {
  const date = new Date(isoString);

  // Lấy ngày, tháng, năm và định dạng theo kiểu yyyy-mm-dd
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0 nên cần cộng thêm 1
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('vi-VN', options);
};

export const formatDate1 = (dateString) => {
  const date = new Date(dateString);
  const daysOfWeek = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
  const dayOfWeek = daysOfWeek[date.getDay()]; // Lấy thứ
  const day = String(date.getDate()).padStart(2, '0'); // Lấy ngày, thêm '0' nếu cần
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Lấy tháng, thêm '0' nếu cần
  return `${dayOfWeek} (${day}/${month})`;
}
export const formatDateDD_MM = (dateString) => {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}`;
}

export const timeAgo = (isoString) => {
  const now = new Date();
  const past = new Date(isoString);
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60) {
      return `${diffInSeconds} giây trước`;
  }
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
      return `${diffInMinutes} phút trước`;
  }
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
      return `${diffInHours} tiếng trước`;
  }
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays <= 2) {
      return `${diffInDays} ngày trước`;
  }
  return past.toLocaleDateString('vi-VN');
}

