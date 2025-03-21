import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Login.scss"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Button, Form, Input, message } from "antd";
import { handleForgotPassword } from "@/services/adminService";
import { useState } from "react";
import { PATHS } from "@/constant/path";
const ForgotPassword = (props) => {
    let [form] = Form.useForm();
    let [text, setText] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const onFinish = async (values) => {
        setIsLoading(true);
        try {
            let response = await handleForgotPassword({ email: values.email });
            if (response?.EC === 0) {
                setText(response?.EM);
                form.resetFields();
            } else {
                message.info(response?.EM);
            }
        } catch (e) { message.error("Có lỗi xảy ra!", e) }
        finally { setIsLoading(false) }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='forgot-pass'>
            <span className="icon-back" onClick={() => props.login()}><FontAwesomeIcon icon={faArrowLeft} /> </span>
            <div className="circle-avatar" onClick={() => navigate(PATHS.HOME.HOMEPAGE)}></div>
            <h2 className="login-title">Hoa Sen</h2>
            {text && <div className="text-success">{text}</div>}
            <Form
                name="basic"
                form={form}
                layout="vertical"
                className="login-form h-100"
                initialValues={{
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>
                <div className="mb-3 ps-2">Lấy lại mật khẩu</div>
                <Form.Item name="email" rules={[{ required: true, message: "Vui lòng nhập email!" }, {
                    pattern: /^[a-zA-Z0-9'@.\s]*$/,
                    message: 'Không chứa ký tự đặc biệt!'
                }, {
                    type: 'email',
                    message: 'Email không hợp lệ!'
                }]}>
                    <Input className='input' placeholder='Nhập email đã đăng ký' maxLength={50} />
                </Form.Item>
                <Form.Item style={{ marginTop: '30px', }}>
                    <Button loading={isLoading} type="primary" htmlType="submit" className="login-button" >
                        Lấy lại mật khẩu
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ForgotPassword;