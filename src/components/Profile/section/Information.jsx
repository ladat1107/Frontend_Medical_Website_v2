import { uploadAndDeleteToCloudinary, uploadToCloudinary } from "@/utils/uploadToCloudinary";
import { Button, Col, DatePicker, Form, Input, message, Progress, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { AOB, CLOUDINARY_FOLDER, GENDER, LINK, MARITALSTATUS, RH } from "@/constant/value";
import { apiService } from "@/services/apiService";
import useQuery from "@/hooks/useQuery";
import { updateProfileInfo } from "@/services/adminService";
import dayjs from 'dayjs';
import "../Profile.scss";

const Information = (props) => {
  let [form] = Form.useForm();
  let [isUpdate, setIsUpdate] = useState(false);
  let [uploadProgress, setUploadProgress] = useState(0);
  let [uploading, setUploading] = useState(false);
  let [profile, setProfile] = useState(props.data);
  let [imageUrl, setImageUrl] = useState(profile?.avatar);
  let currentResidentData = profile?.currentResident?.split("%") || [];
  let birthData = profile?.address?.split("%") || [];
  let [province, setProvince] = useState([]);
  let [currentProvinceId, setCurrentProvinceId] = useState(+currentResidentData[3]);
  let [birthProvinceId, setBirthProvinceId] = useState(+birthData[3] || null);
  let [currentDistrictId, setCurrentDistrictId] = useState(+currentResidentData[2]);
  let [birthDistrictId, setBirthDistrictId] = useState(+birthData[2]);
  let [currentListDistrict, setCurrentListDistrict] = useState([]);
  let [birthListDistrict, setBirthListDistrict] = useState([]);
  let [currentListWard, setCurrentListWard] = useState([]);
  let [birthListWard, setBirthListWard] = useState([]);
  let initValue = {
    dob: profile?.dob ? dayjs(dayjs(profile?.dob).format('DD/MM/YYYY'), "DD/MM/YYYY") : null,
    lastName: profile?.lastName || "",
    firstName: profile?.firstName || "",
    email: profile?.email || "",
    cid: profile?.cid || "",
    gender: +(profile?.gender || 0),
    phoneNumber: profile?.phoneNumber || "",
    folk: profile?.folk || null,
    ABOBloodGroup: profile?.ABOBloodGroup,
    RHBloodGroup: profile?.RHBloodGroup,
    maritalStatus: profile?.maritalStatus,
    birthProvince: +birthData[3] || null,
    birthDistrict: +birthData[2] || null,
    birthWard: +birthData[1] || null,
    birthAddress: birthData[0] || "",
    currentProvince: +currentResidentData[3] || null,
    currentDistrict: +currentResidentData[2] || null,
    currentWard: +currentResidentData[1] || null,
    currentAddress: currentResidentData[0] || "",
  }
  let { data: provinceData } = useQuery(() => apiService.getAllProvince())
  let { data: currentDistrictList } = useQuery(
    () => currentProvinceId && apiService.getDistrictByProvinceId(currentProvinceId),
    [currentProvinceId]
  );
  let { data: birthDistrictList } = useQuery(
    () => birthProvinceId && apiService.getDistrictByProvinceId(birthProvinceId),
    [birthProvinceId]
  );
  let { data: currentWardList } = useQuery(
    () => currentDistrictId && apiService.getWardByDistrictId(currentDistrictId),
    [currentDistrictId]
  );
  let { data: birthWardList } = useQuery(
    () => birthDistrictId && apiService.getWardByDistrictId(birthDistrictId),
    [birthDistrictId]
  );
  useEffect(() => {
    if (provinceData) {
      let _province = provinceData?.data?.map((item) => {
        return {
          value: +item.id,
          label: item.full_name
        }
      })
      setProvince(_province);
    }
  }, [provinceData])
  useEffect(() => {
    if (currentDistrictList) {
      let _district = currentDistrictList?.data?.map((item) => {
        return {
          value: +item.id,
          label: item.full_name
        }
      })
      setCurrentListDistrict(_district);
    }
  }, [currentDistrictList])
  useEffect(() => {
    if (birthDistrictList) {
      let _district = birthDistrictList?.data?.map((item) => {
        return {
          value: +item.id,
          label: item.full_name
        }
      })
      setBirthListDistrict(_district);
    }
  }, [birthDistrictList])
  useEffect(() => {
    if (currentWardList) {
      let _ward = currentWardList?.data?.map((item) => {
        return {
          value: +item.id,
          label: item.full_name
        }
      })
      setCurrentListWard(_ward);
    }
  }, [currentWardList])
  useEffect(() => {
    if (birthWardList) {
      let _ward = birthWardList?.data?.map((item) => {
        return {
          value: +item.id,
          label: item.full_name
        }
      })
      setBirthListWard(_ward);
    }
  }, [birthWardList])

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true); // Bắt đầu upload
    setUploadProgress(0); // Đặt lại tiến trình về 0
    try {
      // Gọi hàm upload với callback để cập nhật tiến trình
      const url = await uploadAndDeleteToCloudinary(file, CLOUDINARY_FOLDER.AVATAR, imageUrl, (progress) => {
        setUploadProgress(progress);
      });
      setImageUrl(url); // Lưu URL ảnh sau khi upload
      message.success("Upload thành công!");
    } catch (error) {
      message.error("Upload thất bại. Vui lòng thử lại.");
      console.error(error);
    } finally {
      setUploading(false); // Kết thúc upload
    }
  };
  const handleSaveInfor = () => {
    if (isUpdate) {
      form.validateFields().then(async (values) => {
        let respone = await updateProfileInfo({
          ...values,
          id: profile?.id,
          avatar: imageUrl,
          address: values.birthAddress + "%" + values.birthWard + "%" + values.birthDistrict + "%" + values.birthProvince,
          currentResident: values.currentAddress + "%" + values.currentWard + "%" + values.currentDistrict + "%" + values.currentProvince,
          dob: values?.dob ? dayjs(values.dob).format('YYYY-MM-DD') : null,
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
    } else {
      setIsUpdate(true);
    }
  }
  const handleCancel = () => {
    setIsUpdate(false);
    form.resetFields();
    setImageUrl(profile?.avatar);
  }
  return (
    <div className='information-profile'>
      <Form
        layout={'horizontal'}
        form={form}
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        initialValues={initValue}
        style={{
          maxWidth: "100%",
        }}
        validateTrigger="submit"
      >
        <Row className="bg-content-profile" >
          <Col xs={24}>
            <Form.Item
              name={"image"}
            >
              <div className='avatar' >
                <div className="image-user" htmlFor={"input-upload-avatar"}
                  onClick={() => document.getElementById('input-upload-avatar').click()}>
                  <img className="avatar" src={imageUrl || LINK.AVATAR_NULL} alt="Uploaded" />
                  <input type="file" id='input-upload-avatar' hidden={true} onChange={handleImageChange} />
                  {uploading && (
                    <div style={{ marginTop: '20px', width: '100%' }}>
                      <Progress percent={uploadProgress} status="active" />
                    </div>
                  )}
                </div>

              </div>
            </Form.Item>
          </Col>
          <Col xs={8} >
            <Form.Item
              name={"lastName"}
              label="Họ và tên đệm"
              rules={[
                {
                  required: true,
                  message: 'Không được để trống!',
                },
              ]}
            >
              <Input disabled={!isUpdate} placeholder="Họ" />
            </Form.Item>
          </Col>
          <Col xs={8} >
            <Form.Item
              name={"firstName"}
              label="Tên"
              rules={[
                {
                  required: true,
                  message: 'Không được để trống!',
                },
              ]}
            >
              <Input disabled={!isUpdate} placeholder="Tên" />
            </Form.Item>
          </Col>
          <Col xs={8} >
            <Form.Item
              name={"email"}
              label="Email"
              rules={[
                {
                  required: true,
                  message: 'Không được để trống!',
                },
                {
                  type: 'email',
                  message: 'Email không hợp lệ!',
                },
              ]}
            >
              <Input type="email" disabled placeholder="Email" />
            </Form.Item>
          </Col>
          <Col xs={8} >
            <Form.Item
              name={"cid"}
              label="Căn cước công dân"
              rules={[
                {
                  required: true,
                  message: 'Không được để trống!',
                },
                {
                  pattern: /^\d{12}$/,
                  message: 'Căn cước phải đúng 12 só!',
                }
              ]}
            >
              <Input disabled={!isUpdate} placeholder="Căn cước công dân" />
            </Form.Item>
          </Col>
          <Col xs={8} >
            <Form.Item
              name={"phoneNumber"}
              label="Số điện thoại"
              rules={[
                {
                  required: true,
                  message: 'Không được để trống!',
                },
                {
                  pattern: /^\d{10}$/,
                  message: 'Số điện thoại phải đúng 10 số!',
                }
              ]}
            >
              <Input disabled={!isUpdate} placeholder="Số điện thoại" />
            </Form.Item>
          </Col>
          <Col xs={8} >
            <Form.Item
              name={"dob"}
              label="Ngày sinh"
            >
              <DatePicker
                placeholder="Chọn ngày sinh"
                disabled={!isUpdate}
                format={'DD/MM/YYYY'} style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col xs={8} >
            <Form.Item
              name={"gender"}
              label="Giới tính"
            >
              <Select disabled={!isUpdate} options={GENDER} placeholder={"Chọn giới tính"} />
            </Form.Item>
          </Col>
          <Col xs={8} >
            <Form.Item
              name={"folk"}
              label="Dân tộc"
            >
              <Select
                placeholder="Chọn dân tộc"
                disabled={!isUpdate}
                showSearch
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={props.folks}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row className="bg-content-profile">
          <Col xs={24}> <label className="ps-3 mb-2">Địa chỉ hiện tại</label></Col>
          <Col xs={8} >
            <Form.Item
              name={"currentProvince"}
              rules={[{
                required: true,
                message: 'Không được để trống!',
              }]}
            >
              <Select
                placeholder="Tỉnh/Thành phố cư trú"
                disabled={!isUpdate}
                showSearch
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                onChange={(value) => {
                  setCurrentProvinceId(value); // Update the state
                  form.setFieldsValue({
                    currentDistrict: null, // Reset district field
                    currentWard: null,
                    currentAddress: "",
                  });
                  setCurrentDistrictId(null); // Reset district state
                }}
                options={province}
              />
            </Form.Item>
          </Col>
          <Col xs={8} >
            <Form.Item
              name={"currentDistrict"}
              rules={[{
                required: true,
                message: 'Không được để trống!',
              }]}
            >
              <Select
                placeholder="Quận/Huyện cư trú"
                disabled={!isUpdate}
                showSearch
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                onChange={(value) => {
                  setCurrentDistrictId(value); // Update the state
                  form.setFieldsValue({// Reset district field
                    currentWard: null,
                    currentAddress: ""
                  });
                }}
                options={currentListDistrict}
              />
            </Form.Item>
          </Col>
          <Col xs={8} >
            <Form.Item
              name={"currentWard"}
              rules={[{
                required: true,
                message: 'Không được để trống!',
              }]}
            >
              <Select
                placeholder="Phường/Xã cư trú"
                disabled={!isUpdate}
                showSearch
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                onChange={() => { form.setFieldsValue({ currentAddress: "" }) }}
                options={currentListWard}
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              name={"currentAddress"}
              rules={[{
                required: true,
                message: 'Không được để trống!',
              }]}
            >
              <Input disabled={!isUpdate} placeholder="Số nhà/ Đường" />
            </Form.Item>
          </Col>
        </Row>
        <Row className="bg-content-profile">
          <Col xs={24}> <label className="ps-3 mb-2">Quê quán</label></Col>
          <Col xs={8} >
            <Form.Item
              name={"birthProvince"}
              rules={[{
                required: true,
                message: 'Không được để trống!',
              }]}
            >
              <Select
                placeholder="Tỉnh/Thành phố quê quán"
                disabled={!isUpdate}
                showSearch
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                onChange={(value) => {
                  setBirthProvinceId(value); // Update the state
                  form.setFieldsValue({
                    birthDistrict: null, // Reset district field
                    birthWard: null,
                    birthAddress: ""
                  });
                  setBirthDistrictId(null); // Reset district state
                }}
                options={province}
              />
            </Form.Item>
          </Col>
          <Col xs={8} >
            <Form.Item
              name={"birthDistrict"}
              rules={[{
                required: true,
                message: 'Không được để trống!',
              }]}
            >
              <Select
                placeholder="Quận/Huyện quê quán"
                disabled={!isUpdate}
                showSearch
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                onChange={(value) => {
                  setBirthDistrictId(value); // Update the state
                  form.setFieldsValue({// Reset district field
                    birthWard: null,
                    birthAddress: ""
                  });
                }}
                options={birthListDistrict}
              />
            </Form.Item>
          </Col>
          <Col xs={8} >
            <Form.Item
              name={"birthWard"}
              rules={[{
                required: true,
                message: 'Không được để trống!',
              }]}
            >
              <Select
                placeholder="Phường/Xã quê quán"
                disabled={!isUpdate}
                showSearch
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                onChange={() => { form.setFieldsValue({ birthAddress: "" }) }}
                options={birthListWard}
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              name={"birthAddress"}
              rules={[{
                required: true,
                message: 'Không được để trống!',
              }]}
            >
              <Input disabled={!isUpdate} placeholder="Số nhà/ Đường" />
            </Form.Item>
          </Col>
        </Row>
        <Row className="bg-content-profile">
          <Col xs={8} >
            <Form.Item
              name={"ABOBloodGroup"}
              label="Nhóm máu hệ ABO?"
            >
              <Select
                disabled={!isUpdate}
                placeholder="Nhóm máu hệ ABO?"
                options={AOB}
              />
            </Form.Item>
          </Col>
          <Col xs={8} >
            <Form.Item
              name={"RHBloodGroup"}
              label="Nhóm máu hệ RH?"
            >
              <Select
                disabled={!isUpdate}
                placeholder="Nhóm máu hệ RH?"
                options={RH}
              />
            </Form.Item>
          </Col>
          <Col xs={8} >
            <Form.Item
              name={"maritalStatus"}
              label="Tình trạng hôn nhân"
            >
              <Select
                disabled={!isUpdate}
                placeholder="Tình trạng hôn nhân?"
                options={MARITALSTATUS}
              />
            </Form.Item>
          </Col>
        </Row>
        <Col className="mt-3" xs={24} style={{ display: 'flex', justifyContent: 'flex-end' }} >
          {isUpdate &&
            <Form.Item>
              <Button key="cancel"
                onClick={() => { handleCancel() }}>Hủy</Button>
            </Form.Item>
          }
          <Form.Item>
            <Button type="primary"
              style={{ background: "#04a9f3" }}
              onClick={() => { handleSaveInfor() }}>{isUpdate ? "Lưu" : "Chỉnh sửa thông tin"}</Button>
          </Form.Item>
        </Col>
      </Form>
    </div >
  )

}
export default Information;