
import { Outlet, Navigate } from "react-router-dom";
import { PATHS } from "@/constant/path";
import { useSelector } from "react-redux";
const PrivateRouter = () => {
    let { user } = useSelector((state) => state.authen);
    return user ? <Outlet /> : <Navigate to={PATHS.HOME.LOGIN} />;
}
export default PrivateRouter;