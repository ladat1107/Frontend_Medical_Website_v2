import { updateProfilePassword } from "@/services/adminService";
import { Button, Col, Form, Input, message, Row } from "antd";
import "../Profile.scss";

const Password = (props) => {
    let [form] = Form.useForm();
    let handleChangePass = () => {
        form.validateFields().then(async (values) => {
            let response = await updateProfilePassword({ ...values, id: props.data });
            if (response?.EC === 0) {
                message.success(response?.EM || "Cập nhật thành công!");
                form.resetFields();
            } else {
                message.error(response?.EM || "Cập nhật thất bại!");
            }
        }).catch((error) => {
            console.log(error);
        })
    }
    let handleCancel = () => {
        form.resetFields();
    }
    return (
        <div className='password-content bg-content-profile mb-0'>
            <div className="text ps-4 mb-3">Đổi mật khẩu</div>
            <Form
                layout={'horizontal'}
                form={form}
                labelCol={{
                    span: 24,
                }}
                wrapperCol={{
                    span: 24,
                }}
                initialValues={{
                    oldPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                }}
                validateTrigger="onBlur"
                style={{
                    maxWidth: "100%",
                }}
            >
                <Row >
                    <Col xs={12}  >
                        <Form.Item
                            name={"oldPassword"}
                            rules={[
                                {
                                    required: true,
                                    message: 'Không được để trống!',
                                },
                            ]}
                        >
                            <Input.Password placeholder="Nhập mật khẩu cũ" />
                        </Form.Item>
                    </Col>

                </Row>
                <Row >
                    <Col xs={12}>
                        <Form.Item
                            name={"newPassword"}
                            rules={[
                                {
                                    required: true,
                                    message: 'Không được để trống!',
                                },
                            ]}
                        >
                            <Input.Password placeholder="Nhập mật khẩu mới" />
                        </Form.Item>
                    </Col>
                    <Col xs={12}>
                        <Form.Item
                            name="confirmPassword"
                            dependencies={['newPassword']}
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng xác nhận mật khẩu!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('newPassword') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Mật khẩu không khớp!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password placeholder="Xác nhận mật khẩu mới" />
                        </Form.Item>
                    </Col>
                </Row>
                <Col className="mt-3" xs={24} style={{ display: 'flex', justifyContent: 'flex-start' }} >
                    <Form.Item>
                        <Button type="primary" htmlType="submit"
                            style={{ background: "#04a9f3" }}
                            onClick={() => { handleChangePass() }}>Cập nhật</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button key="cancel"
                            onClick={() => { handleCancel() }}>Hủy</Button>
                    </Form.Item>

                </Col>
            </Form>
        </div>
    )
}
export default Password;