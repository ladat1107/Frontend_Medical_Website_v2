import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./IconUpload.scss";
import { FloatButton } from "antd";
import { CloudUploadOutlined } from "@mui/icons-material";
const IconUpload = (props) => {
    return (
        // <div className="icon-upload">

        // </div>
        <FloatButton
            style={{ width: 75, height: 75, }}
            icon={<FontAwesomeIcon style={{ height: "fit-content", fontSize: 50 }} size="xxl" icon={faCloudArrowUp} />}
            onClick={() => console.log('onClick')}
        />
    )
}
export default IconUpload;