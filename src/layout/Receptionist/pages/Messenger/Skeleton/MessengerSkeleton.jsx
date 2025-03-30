import { Skeleton } from "antd";
import { ArrowLeftOutlined, SearchOutlined } from "@ant-design/icons";
import SkeletonChatContent from "./SkeletonChatContent";

const MessageSkeleton = () => {
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            {/* Left sidebar */}
            <div style={{ width: "300px", borderRight: "1px solid #e8e8e8", display: "flex", flexDirection: "column" }}>
                {/* Header */}
                <div style={{ backgroundColor: "white", padding: "12px", display: "flex", alignItems: "center", height: "68px" }}>
                    <ArrowLeftOutlined style={{ marginRight: "8px" }} />
                    <Skeleton.Input active style={{ width: "100%", height: 30 }} size="large" />
                </div>

                {/* Search bar */}
                <div style={{ padding: "8px", borderBottom: "1px solid #e8e8e8" }}>
                    <div style={{ backgroundColor: "#f5f5f5", borderRadius: "4px", display: "flex", alignItems: "center", padding: "8px 12px" }}>
                        <SearchOutlined style={{ color: "#a0a0a0", marginRight: "8px" }} />
                        <Skeleton.Input active style={{ width: 180, height: 16 }} size="small" />
                    </div>
                </div>

                {/* Chat list */}
                <div style={{ flex: 1, overflowY: "auto" }}>
                    {Array.from({ length: 7 }).map((_, index) => (
                        <div key={index} style={{ padding: "12px", borderBottom: "1px solid #e8e8e8", display: "flex", alignItems: "center" }}>
                            <Skeleton.Avatar active size="default" />
                            <div style={{ marginLeft: "12px" }}>
                                <Skeleton.Input active style={{ width: 120, height: 16 }} size="small" />
                                <Skeleton.Input active style={{ width: 80, height: 14, marginTop: 4 }} size="small" />
                            </div>
                            <Skeleton.Input active style={{ width: 40, height: 12 }} size="small" />
                        </div>
                    ))}
                </div>
            </div>

            <SkeletonChatContent />
        </div>
    );
};

export default MessageSkeleton;
