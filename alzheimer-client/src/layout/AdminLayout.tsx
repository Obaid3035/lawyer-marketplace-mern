import React from "react";
import AdminNavbar from "../Container/Admin/Navbar/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { getToken } from "../util/helper";

const AdminLayout = () => {
  const { auth } = useAuth();
  return auth || getToken() ? (
    <React.Fragment>
      <AdminNavbar />
      <Outlet />
    </React.Fragment>
  ) : (
    <Navigate to={"/"} replace={true} />
  );
};

export default AdminLayout;
