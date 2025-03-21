import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Login.scss";
import { faArrowLeft, faKey, faMobileScreen, faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";
import { Button, Col, Form, Input, message, Row } from "antd";
import { faAddressCard, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { handleRegisterUser } from "@/services/adminService";
import { useState } from "react";
import { PATHS } from "@/constant/path";

const Register = (props) => {
    let [form] = Form.useForm();
    let [text, setText] = useState(null);
    let [isLoading, setIsLoading] = useState(false);
    let messageError = 'Vui lòng nhập thông tin!';
    const onFinish = async (values) => {
        setIsLoading(true);
        try {
            let response = await handleRegisterUser(values);
            if (response?.EC === 0) {
                setText(response?.EM);
                form.resetFields();
            } else {
                message.info(response?.EM);
            }
        } catch (error) {
            error.message("Có lỗi xảy ra!", error);
        } finally { setIsLoading(false) }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='register'>
            <span className="icon-back" onClick={() => props.login()}><FontAwesomeIcon icon={faArrowLeft} /> </span>
            <div className="circle-avatar" onClick={() => navigate(PATHS.HOME.HOMEPAGE)}></div>
            <h2 className="login-title">Đăng ký</h2>
            {text && <div className="text-success"><b>{text}</b></div>}
            <Form
                name="basic"
                form={form}
                layout="vertical"
                className="login-form"
                initialValues={{
                }}
                width={100}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>
                <Row gutter={[16, 1]} width={100}>
                    <Col xs={24} md={12}>
                        <Form.Item name="lastName" rules={[{ required: true, message: messageError }, {
                            pattern: /^[a-zA-ZÀ-ỹDđ'\s]+$/,
                            message: 'Không chứa ký tự đặc biệt!'
                        }]}>
                            <Input className='input-register' placeholder='Họ' maxLength={50} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="firstName" rules={[{ required: true, message: messageError }, {
                            pattern: /^[a-zA-ZÀ-ỹDđ'\s]+$/,
                            message: 'Không chứa ký tự đặc biệt!'
                        }]}>
                            <Input className='input-register' placeholder='Tên' maxLength={50} />
                        </Form.Item>
                    </Col>
                    <Col xs={24}>
                        <Form.Item name="email" rules={[{ required: true, message: messageError }, {
                            pattern: /^[a-zA-Z0-9'@.\s]*$/,
                            message: 'Không chứa ký tự đặc biệt!'
                        }, {
                            type: 'email',
                            message: 'Email không hợp lệ!'
                        }]}>
                            <Input prefix={<FontAwesomeIcon className="icon-input" icon={faEnvelope} />} className='input-register' placeholder='Email' maxLength={50} />
                        </Form.Item>
                    </Col>
                    <Col xs={24}>
                        <Form.Item name="cid" rules={[{ required: true, message: messageError }, {
                            pattern: /^[0-9]{12}$/,
                            message: 'Căn cước không hợp lệ!'
                        }]}>
                            <Input prefix={<FontAwesomeIcon className="icon-input" icon={faAddressCard} />} className='input-register' placeholder='Căn cước công dân' maxLength={12} />
                        </Form.Item>
                    </Col>
                    <Col xs={24}>
                        <Form.Item name="phoneNumber" rules={[{ required: true, message: messageError }, {
                            pattern: /^(0[3|5|7|8|9][0-9]{8})$/,
                            message: 'Số điện thoại không hợp lệ!'
                        }]}>
                            <Input prefix={<FontAwesomeIcon className="icon-input" icon={faMobileScreen} />} className='input-register' placeholder='Số điện thoại' maxLength={10} />
                        </Form.Item>
                    </Col>
                    <Col xs={24}>
                        <Form.Item name="password" rules={[{ required: true, message: messageError }, { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }]}
                            hasFeedback>
                            <Input.Password prefix={<FontAwesomeIcon className="icon-input" icon={faKey} />} className='input-register' placeholder='Mật khẩu' minLength={6} />
                        </Form.Item>
                    </Col>
                    <Col xs={24}>
                        <Form.Item name="confirmPassword" dependencies={['password']}
                            rules={[
                                { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('Mật khẩu xác nhận không khớp!');
                                    },
                                }),
                            ]}
                            hasFeedback>
                            <Input.Password prefix={<FontAwesomeIcon className="icon-input" icon={faUnlockKeyhole} />} className='input-register' placeholder='Nhập lại mật khẩu' minLength={6} />
                        </Form.Item>
                    </Col>
                    <Button loading={isLoading} type="primary" htmlType="submit" className="register-button" >
                        Đăng ký
                    </Button>
                </Row>
            </Form>
        </div >
    );
}
export default Register;