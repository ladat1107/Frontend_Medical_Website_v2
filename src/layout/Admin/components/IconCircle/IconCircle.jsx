
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconCircle = ({ icon, color, background, size }) => {
    return (
        <div className="icon-circle d-flex justify-content-center align-items-center"
            style={{ background: background, borderRadius: "50%", width: size, height: size, }}>
            <FontAwesomeIcon icon={icon} color={color} size="2xl" />
        </div>
    )
}
export default IconCircle;