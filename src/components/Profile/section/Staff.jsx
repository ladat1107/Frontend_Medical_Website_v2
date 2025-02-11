import { Button, Col, Form, Input, message, Row, Select } from "antd";
import { useState } from "react";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { LINK, POSITION } from "@/constant/value";
import { profileUpdateStaff } from "@/services/adminService";
import { formatCurrency } from "@/utils/formatCurrency";
import ParseHtml from "@/components/ParseHtml";
let mdParser = new MarkdownIt(/* Markdown-it options */);
const { TextArea } = Input;

const StaffInfo = (props) => {
    let [form] = Form.useForm();
    let [isUpdate, setIsUpdate] = useState(false);
    let info = props.data;
    let price = formatCurrency(info?.staffUserData?.price) || "Miễn phí";
    const [markdownValue, setMarkdownValue] = useState(info?.staffUserData?.staffDescriptionData?.markDownContent || "");
    let htmlContent = info?.staffUserData?.staffDescriptionData?.htmlContent || "";
    // Finish!
    let handleEditorChange = ({ html, text }) => {
        //setMarkdownValue(text);
        htmlContent = html;
        form.setFieldsValue({ markDownContent: text }); // Cập nhật giá trị cho Form.Item
    };
    let handleSaveInfor = () => {
        form.validateFields().then(async (values) => {
            let respone = await profileUpdateStaff({
                ...values,
                id: info?.staffUserData?.id,
                descriptionId: info?.staffUserData?.staffDescriptionData?.id,
                htmlContent: htmlContent
            });
            if (respone?.EC === 0) {
                message.success(respone?.EM || "Cập nhật thông tin thành công!")
                props.refresh(props.page);
            } else {
                message.error(respone?.EM || "Cập nhật thông tin thất bại!")
            }
        }).catch((error) => {
            console.log(error);
        })
    }
    let handleCancel = () => {
        setIsUpdate(false);
        form.resetFields();
    }
    return (
        <>
            {isUpdate ?
                <div className="staff-info-update bg-content-profile">
                    <div className="text ps-4 mb-3">Hồ sơ nghề nghiệp</div>
                    <Form
                        form={form}
                        validateTrigger="onBlur"
                        initialValues={{
                            shortDescription: info?.staffUserData?.shortDescription || "",
                            markDownContent: info?.staffUserData?.staffDescriptionData?.markDownContent || "",
                            specialtyId: info?.staffUserData?.specialtyId || null,
                            position: info?.staffUserData?.position?.split(',') || [],
                        }}
                        labelCol={{
                            span: 24,
                        }}
                        wrapperCol={{
                            span: 24,
                        }}
                    >
                        <Row>
                            <Col xs={12}>
                                <Form.Item
                                    name="specialtyId"
                                    label="Chuyên khoa"
                                >
                                    <Select
                                        placeholder="Chọn chuyên khoa"
                                        showSearch
                                        optionFilterProp="label"
                                        filterSort={(optionA, optionB) =>
                                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                        }
                                        options={props.specialty}
                                    >
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={12} >
                                <Form.Item
                                    name="position"
                                    label="Trình độ"
                                >
                                    <Select
                                        mode="multiple"
                                        placeholder="Vui lòng chọn chức vụ"
                                        options={POSITION}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={24} className="mb-3">
                                <Form.Item
                                    name="shortDescription"
                                    label="Giới thiệu"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập mô tả!',
                                        },
                                    ]}
                                >
                                    <TextArea rows={8} placeholder="Mô tả ngắn" />
                                </Form.Item>
                            </Col>
                            <Col span={24} >
                                <Form.Item
                                    name={"markDownContent"}
                                    label="Mô tả chi tiết quá trình làm việc"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập mô tả!',
                                        },
                                    ]}
                                >
                                    <MdEditor style={{

                                        padding: "5px",
                                        minHeight: '400px',
                                        borderRadius: "5px"
                                    }}
                                        value={markdownValue}
                                        renderHTML={text => mdParser.render(text)}
                                        onChange={handleEditorChange} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                    <Col xs={24} style={{ display: 'flex', justifyContent: 'flex-end' }} >
                        <Form.Item>
                            <Button key="cancel"
                                onClick={() => { handleCancel() }}>Hủy</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary"
                                style={{ background: "#04a9f3" }}
                                onClick={() => { handleSaveInfor() }}>Lưu thông tin</Button>
                        </Form.Item>
                    </Col>
                </div>
                :
                <div className="staff-info-view ">
                    <div className="ps-4 bg-content-profile d-flex  ">
                        <div className=" avatar ">
                            <img src={info?.avatar || LINK.AVATAR_NULL} alt="avatar" />
                        </div>
                        <div className="ms-3 right-view w-100">
                            <div className="text mb-1"><span className="text-upcase me-2">{info?.staffUserData?.position}</span>{info?.lastName + " " + info?.firstName}</div>
                            <div className="mt-2"><label >Chuyên khoa</label><span> {info?.staffUserData?.staffSpecialtyData?.name || "Không chuyên khoa"}</span></div>
                            <div className="mt-2"><label >Khoa</label><span> {info?.staffUserData?.staffDepartmentData?.name}</span></div>
                            <div className="mt-2"><label >Giá khám</label><span> {price}</span></div>
                            <div className="mt-4 d-flex justify-content-end me-4"> <Button type="primary"
                                style={{ background: "#04a9f3" }}
                                onClick={() => { setIsUpdate(true) }}>Chỉnh sửa</Button></div>
                        </div>
                    </div>
                    <div className="p-4 bg-content-profile">
                        <div className="text">Giới thiệu</div>
                        <div className="content mt-3">{info?.staffUserData?.shortDescription}</div>
                    </div>
                    <div className="p-4 bg-content-profile html mb-0">
                        <ParseHtml htmlString={info?.staffUserData?.staffDescriptionData?.htmlContent} />

                    </div>
                </div>
            }

        </>
    )
}
export default StaffInfo;