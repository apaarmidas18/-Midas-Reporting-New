import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { HiOutlineDownload } from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai";
import HeaderBreadcrumbs from "../components/HeaderBreadcrumbs";
import GetEmployeeLogs from "../API/ChangeLogs/GetEmployeeLogs";
import moment from "moment";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Link } from "react-router-dom";

const Employeelogs = () => {
  const [employeeLogs, setEmployeeLogs] = useState([]);
  const [loading, setLoading] = useState("");
  var rows = [];
  useEffect(() => {
    GetEmployeeLogs({ setEmployeeLogs, setLoading });
  }, []);

  /* ------------------------------------------Adding Elements To Array-------------------------------- */
  for (let index = 0; index < employeeLogs.length; index++) {
    const element = employeeLogs[index];

    rows.push({
      ...element,
      createDate: moment(element.createDate).format("MM/DD/YYYY"),
      edit: (
        <button type="button" class="edit-btn">
          <i class="fa fa-pencil"></i>
        </button>
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
        field: "userName",
        sort: "asc",
        width: 150,
      },
      {
        label: "Remark",
        field: "editRemarks",
        sort: "asc",
        width: 270,
      },

      {
        label: "Create Date",
        field: "createDate",
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
      <div className="container-fluid round-border bg-white mt-4 p-2 px-4">
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

export default Employeelogs;
