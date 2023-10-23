import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { AiOutlinePlus } from "react-icons/ai";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import GetAllUsers from "../../API/User/GetAllUsers";

import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Button from "../../components/atoms/Button";

const Viewuser = () => {
  const [userdata, setUserData] = useState([]);
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();
  var rows = [];

  // useEffect(() => {
  //   GetAllUsers({ setUserData, setLoading });
  //   conditionalRowData({ rows, userdata });
  // }, [userdata]);
  console.log(userdata);
  useEffect(() => {
    GetAllUsers({ setUserData, setLoading });
  }, []);
  /* ------------------------------------------Adding Elements To Array-------------------------------- */
  for (let index = 0; index < userdata.length; index++) {
    const element = userdata[index];
    rows.push({
      ...element,
      status:
        element.status == 1
          ? "Active"
          : element.status == 2
          ? "Inactive"
          : element.status,
      rollId:
        element.rollId == 1
          ? "Super-Admin"
          : element.rollId == 2
          ? "Admin"
          : element.rollId == 3
          ? "Moderator"
          : element.rollId == 4
          ? "On-Boarding"
          : element.rollId == 5
          ? "Recruiter"
          : element.rollId == 6
          ? "Team-Lead"
          : element.rollId,
      type:
        element.type == 1
          ? "Internal"
          : element.type == 2
          ? "External"
          : element.type,
      action: (
        <Link
          type="button"
          class="edit-btn"
          state={{ data: element }}
          to={"/dashboard/edit-user"}
        >
          <i class="fa fa-pencil"></i>
        </Link>
      ),
    });
  }
  /* ------------------------------------------Adding Elements To Array-------------------------------- */

  const data = {
    columns: [
      {
        label: "ID",
        field: "id",
        sort: "asc",
        width: 50,
      },
      {
        label: "Name",
        field: "name",
        sort: "asc",
        width: 200,
      },
      {
        // label: "Username",
        field: "username",
        sort: "asc",
        width: 270,
      },
      {
        label: "Password",
        field: "password",
        sort: "asc",
        width: 200,
      },
      {
        label: "Status",
        field: "status",
        sort: "asc",
        width: 200,
      },
      {
        label: "Roll",
        field: "rollId",
        sort: "asc",
        width: 200,
      },
      {
        label: "Type",
        field: "type",
        sort: "asc",
        width: 100,
      },
      {
        label: "Edit",
        field: "action",
        width: 100,
      },
    ],
    rows: rows,
    // rows: userdata,
  };

  return (
    <>
      <div className="container-fluid">
        <div className="heading">
          <HeaderBreadcrumbs
            meta={"User"}
            main={"List"}
            heading={"User List"}
          />
          <div className="button-group">
            <Button
              btnlogo={<AiOutlinePlus size={20} />}
              btnclass="export-btn"
              btnOnClick={() => navigate("/dashboard/add-user")}
              btnTitle="New User"
            />
          </div>
        </div>
      </div>
      <div className="container-fluid big-box round-border bg-white mt-4 p-2 px-4">
        <MDBDataTable
          id="test"
          striped
          bordered
          hover
          sorting={true}
          small
          data={data}
        />
      </div>
    </>
  );
};

export default Viewuser;
