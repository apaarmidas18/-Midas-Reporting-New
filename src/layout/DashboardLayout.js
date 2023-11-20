import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";

const DashboardLayout = () => {
  const user = localStorage.getItem("User");
  const parsedJson = JSON.parse(user);
  const navigate = useNavigate();
  useEffect(() => {
    if (
      parsedJson.rollId == 7 ||
      parsedJson.rollId == 6 ||
      parsedJson.rollId == 5 ||
      parsedJson.rollId == 8
    ) {
      return navigate("/portal");
    }
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
