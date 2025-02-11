
import { Layout } from "antd";
const { Footer } = Layout;
const DoctorFooter = () => {
    return (
        <Footer
            style={{
                textAlign: 'center',
            }}
        >
            Hoa sen ©{new Date().getFullYear()} Created by D^2
        </Footer>
    );

}
export default DoctorFooter;
