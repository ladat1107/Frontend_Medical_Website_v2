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