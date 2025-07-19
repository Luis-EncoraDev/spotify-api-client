import { Navigate, Outlet } from "react-router-dom";

const AuthWrapper = () => {
    const token = localStorage.getItem("jwt");

    if (!token) return <Navigate to="/login" replace/>
    return <Outlet/>
}

export default AuthWrapper;