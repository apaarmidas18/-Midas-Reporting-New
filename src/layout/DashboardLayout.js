import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";

const DashboardLayout = () => {
  const user = localStorage.getItem("User");
  const parsedJson = JSON.parse(user);
  const navigate = useNavigate();
  useEffect(() => {
    return parsedJson.rollId === 7
      ? navigate("/portal")
      : parsedJson.rollId === 6
      ? navigate("/portal")
      : parsedJson.rollId === 5
      ? navigate("/portal")
      : null;
  }, []);
  return (
    <div>
      <Sidebar />
      {/* <Layout /> */}
      <div className="outlet-container">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
