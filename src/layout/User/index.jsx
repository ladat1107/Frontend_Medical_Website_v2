import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatBubbleUser from "./components/ChatUser/ChatBubbleUser";
import 'bootstrap/dist/css/bootstrap.min.css';
function MainLayout() {
    return (
        <>
            <Header />
            <Outlet />
            <ChatBubbleUser />
            <Footer />
        </>

    );
}

export default MainLayout;
