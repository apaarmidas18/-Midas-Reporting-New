import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { HiOutlineDownload } from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import GetAllEmployee from "../../API/Employee/GetAllEmployee";
import moment from "moment";
import { Link } from "react-router-dom";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const Employeecontrol = () => {
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [loading, setLoading] = useState("");
  var rows = [];

  useEffect(() => {
    GetAllEmployee({ setEmployeeDetails, setLoading });
  }, []);
  /* ------------------------------------------Adding Elements To Array-------------------------------- */
  for (let index = 0; index < employeeDetails.length; index++) {
    const element = employeeDetails[index];

    rows.push({
      ...element,
      createDate: moment(element.createDate).format("DD/MM/YYYY"),
      edit: (
        <Link
          type="button"
          class="edit-btn"
          state={{ data: element }}
          to={"/dashboard/edit-employee"}
        >
          <i class="fa fa-pencil"></i>
        </Link>
      ),
      action: (
        <>
          <div
            class="btn-group"
            role="group"
            aria-label="Basic mixed styles example"
          >
            <Link
              type="button"
              class="btn btn-danger"
              state={{ data: element }}
              style={{ padding: "7px 13px", height: "33px" }}
              to={"/dashboard/add-project"}
            >
              <i
                class="fa-solid fa-plus"
                style={{
                  color: "white",
                }}
              ></i>
            </Link>
            <Link
              type="button"
              class="btn btn-success"
              state={{ data: element }}
              style={{ padding: "7px 13px", height: "33px" }}
              to={"/dashboard/view-project-by-empid"}
            >
              <i class="fa fa-eye" style={{ color: "white" }}></i>
            </Link>
          </div>
        </>
      ),
      documents: (
        <Link
          type="button"
          class="upload-btn"
          state={{ data: element }}
          to={"/dashboard/upload-document"}
        >
          <i class="fa-solid fa-upload" style={{ color: "black" }}></i>
        </Link>
      ),
    });
  }
  /* ------------------------------------------Adding Elements To Array-------------------------------- */

  const data = {
    columns: [
      {
        label: "S.No",
        field: "id",
        sort: "asc",
        width: 150,
      },
      {
        label: "Emp-Id",
        field: "employeeId",
        sort: "asc",
        width: 150,
      },
      {
        label: "Name",
        field: "name",
        sort: "asc",
        width: 150,
      },
      {
        label: "SSN",
        field: "ssn",
        sort: "asc",
        width: 270,
      },
      {
        label: "Email",
        field: "email",
        sort: "asc",
        width: 200,
      },
      {
        label: "Create Date",
        field: "createDate",
        sort: "asc",
        width: 100,
      },
      {
        label: "Edit",
        field: "edit",
        sort: "asc",
        width: 150,
      },
      {
        label: "Project",
        field: "action",
        sort: "asc",
        width: 100,
      },
      {
        label: "Documents",
        field: "documents",
        sort: "asc",
        width: 100,
      },
    ],
    rows: rows,
  };
  return (
    <>
      <div className="container-fluid">
        <div className="heading">
          <HeaderBreadcrumbs
            meta={"Employee"}
            main={"List"}
            heading={"Employee List"}
          />
          <div className="button-group">
            <Link to="/dashboard/add-employee">
              <button
                className="export-btn"
                style={{
                  marginRight: "18px",
                  width: "140px",
                }}
              >
                <AiOutlinePlus size={22} /> New Employee
              </button>
            </Link>
            <button className="export-btn" style={{ width: "120px" }}>
              <HiOutlineDownload size={22} />
              <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="export-list"
                table="table-to-xls"
                filename="Employee List"
                sheet="Employee List"
                buttonText=" Export List"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="conttable-to-xlsainer-fluid round-border bg-white mt-4 p-2 px-4">
        <MDBDataTable
          id="table-to-xls"
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

export default Employeecontrol;
