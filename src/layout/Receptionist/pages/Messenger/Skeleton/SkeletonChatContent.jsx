import { Skeleton } from "antd";
import { SendOutlined, PaperClipOutlined } from "@ant-design/icons";
const SkeletonMessage = ({ isSent }) => (
    <div style={{ display: "flex", justifyContent: isSent ? "flex-end" : "flex-start", marginBottom: "16px" }}>
        {!isSent && <Skeleton.Avatar active size="small" />}
        <div style={{ margin: isSent ? "0 8px 0 0" : "0 0 0 8px", maxWidth: "70%" }}>
            <div style={{ backgroundColor: "white", borderRadius: "8px", padding: "12px", boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
                <Skeleton.Input active style={{ width: Math.random() * 100 + 100, height: 16 }} size="small" />
            </div>
        </div>
    </div>
);
const SkeletonChatContent = () => {
    return (
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {/* Chat header */}
            <div style={{ padding: "12px", borderBottom: "1px solid #e8e8e8", display: "flex", alignItems: "center" }}>
                <Skeleton.Avatar active size="default" />
                <div style={{ marginLeft: "12px" }}>
                    <Skeleton.Input active style={{ width: 120, height: 16 }} size="small" />
                    <Skeleton.Input active style={{ width: 80, height: 14, marginTop: 4 }} size="small" />
                </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, padding: "16px", overflowY: "auto", backgroundColor: "#f5f5f5" }}>
                <div style={{ textAlign: "center", margin: "16px 0" }}>
                    <Skeleton.Input active style={{ width: 150, height: 14 }} size="small" />
                </div>
                {Array.from({ length: 6 }).map((_, index) => (
                    <SkeletonMessage key={index} isSent={index % 2 === 0} />
                ))}
            </div>

            {/* Message input */}
            <div style={{ padding: "6px 16px", borderTop: "1px solid #e8e8e8", display: "flex", alignItems: "center" }}>
                <PaperClipOutlined style={{ color: "#a0a0a0", fontSize: "20px", marginRight: "12px" }} />
                <div style={{ flex: 1, backgroundColor: "#f5f5f5", borderRadius: "24px", padding: "8px 16px" }}>
                    <Skeleton.Input active style={{ width: "100%", height: 12 }} size="small" />
                </div>
                <SendOutlined style={{ color: "#00bcd4", fontSize: "20px", marginLeft: "12px" }} />
            </div>
        </div>
    )
}

export default SkeletonChatContent;
