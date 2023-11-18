import React from "react";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import GetAllEmployee from "../../API/Employee/GetAllEmployee";
import moment from "moment";
import { useState } from "react";
import { useEffect } from "react";
import TabName from "../../components/TabName";

const ExtensionCandidates = () => {
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [loading, setLoading] = useState("");
  var rows = [];
  useEffect(() => {
    GetAllEmployee({ setEmployeeDetails, setLoading });
  }, []);
  for (let index = 0; index < employeeDetails.length; index++) {
    const element = employeeDetails[index];

    rows.push({
      ...element,
      createDate: moment(element.createDate).format("MM/DD/YYYY"),
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
  const data = {
    columns: [
      {
        label: "S.No",
        field: "id",
        sort: "asc",
        width: 10,
      },
      {
        label: "Candidate Name",
        field: "name",
        sort: "asc",
        width: 50,
      },
      {
        label: "JA",
        field: "ja",
        sort: "asc",
        width: 50,
      },
      {
        label: "Client Name",
        field: "clientname",
        sort: "asc",
        width: 50,
      },
      {
        label: "End Date",
        field: "endDate",
        sort: "asc",
        width: 50,
      },
      {
        label: "Job Id",
        field: "jobid",
        sort: "asc",
        width: 50,
      },
      {
        label: "Housing",
        field: "housing",
        sort: "asc",
        width: 50,
      },

      {
        label: "Benefits",
        field: "benefits",
        sort: "asc",
        width: 50,
      },
      {
        label: "GP%",
        field: "gp",
        sort: "asc",
        width: 50,
      },
      {
        label: "D/E",
        field: "de",
        sort: "asc",
        width: 50,
      },
      {
        label: "Speciality",
        field: "speciality",
        sort: "asc",
        width: 50,
      },
      {
        label: "Recruiter",
        field: "recruiter",
        sort: "asc",
        width: 50,
      },
      {
        label: "Candidates E",
        field: "candidatese",
        sort: "asc",
        width: 50,
      },
      {
        label: "Request Date",
        field: "requestdate",
        sort: "asc",
        width: 50,
      },
      {
        label: "Notes",
        field: "notes",
        sort: "asc",
        width: 50,
      },
      {
        label: "Request",
        field: "request",
        sort: "asc",
        width: 50,
      },
      {
        label: "Client External",
        field: "clientexternal",
        sort: "asc",
        width: 50,
      },
      {
        label: "Sales Rep",
        field: "salesrep",
        sort: "asc",
        width: 50,
      },
    ],
    rows: rows,
  };
  return (
    <>
      <div className="container-fluid tab-container">
        <TabName tabname="Extension Candidates" />
        <div className="container-fluid job-table">
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
      </div>
    </>
  );
};

export default ExtensionCandidates;
