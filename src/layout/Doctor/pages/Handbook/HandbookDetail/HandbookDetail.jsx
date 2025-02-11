import DetailHandbook from "@/components/HandbookItem/Detail";
import { useParams } from "react-router-dom";

const HandbookDetail = () => {
    let { id } = useParams();
    return (
        <div className="p-4">
            <DetailHandbook id={id} />
        </div>
    )
}
export default HandbookDetail;