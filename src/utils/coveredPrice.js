import { COVERED } from "@/constant/value";

export const insuranceCovered = (price, coveredLevel) => {

    const numericPrice = Number(price);
    if (!numericPrice || isNaN(numericPrice)) return 0;
    if (!coveredLevel) return 0;

    const covered = COVERED[coveredLevel];

    if (covered !== undefined && covered !== null) {
        return numericPrice * covered;
    }
    
    return 0;
}
export const medicineCovered = (price, coveredLevel, insuranceCovered) => {

    const numericPrice = Number(price);
    if (!numericPrice || isNaN(numericPrice)) return 0;
    
    if (!coveredLevel && !insuranceCovered) return 0;
    
    const covered = COVERED[coveredLevel];
    if (covered !== undefined && covered !== null && insuranceCovered && insuranceCovered > 0) {
        return numericPrice * covered * insuranceCovered;
    }
    
    if ((covered === undefined || covered === null) && insuranceCovered) {
        return numericPrice * insuranceCovered;
    }
    
    if (covered !== undefined && covered !== null && (!insuranceCovered || insuranceCovered === 0)) {
        return numericPrice * covered;
    }
    return 0;
}