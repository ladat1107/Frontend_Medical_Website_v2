export function convertGender(genderId) {
    return genderId === 0 ? "Nam" : (genderId === 1 ? "Nữ" : "");
}