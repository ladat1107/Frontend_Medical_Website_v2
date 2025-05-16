import { SearchOutlined } from "@ant-design/icons";
import { Input, Select } from "antd";
import { STATUS_BE } from "@/constant/value";

const RoomFilter = ({
    search,
    handleChangeSearch,
    filter,
    departments,
    typeRoom,
    handleChangeDepartment,
    handleChangeTypeRoom,
    handleChangeStatus
}) => {
    return (
        <div className="px-4 pt-4">
            <div className="flex flex-wrap items-center gap-4">
                <div className="w-full md:w-64 lg:flex-1">
                    <Input
                        placeholder="Tìm kiếm theo tên phòng"
                        value={search}
                        onChange={handleChangeSearch}
                        prefix={<SearchOutlined className="site-form-item-icon" />}
                        className="w-full"
                    />
                </div>
                <div className="w-full md:w-48">
                    <Select
                        placeholder="Lọc theo khoa"
                        className="w-full"
                        value={filter.departmentId}
                        onChange={handleChangeDepartment}
                        allowClear
                        options={departments}
                    />
                </div>
                <div className="w-full md:w-48">
                    <Select
                        placeholder="Lọc theo loại phòng"
                        className="w-full"
                        value={filter.typeRoom}
                        onChange={handleChangeTypeRoom}
                        allowClear
                        options={typeRoom}
                    />
                </div>
                <div className="w-full md:w-32">
                    <Select
                        placeholder="Trạng thái"
                        className="w-full"
                        value={filter.status}
                        onChange={handleChangeStatus}
                        allowClear
                        options={[{ value: STATUS_BE.ACTIVE + "", label: "Hoạt động" }, { value: STATUS_BE.INACTIVE + "", label: "Khóa" }]}
                    />
                </div>
            </div>
        </div>
    )
}

export default RoomFilter;