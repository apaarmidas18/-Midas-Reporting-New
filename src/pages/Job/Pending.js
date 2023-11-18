import React from "react";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import GetAllEmployee from "../../API/Employee/GetAllEmployee";
import moment from "moment";
import { useState } from "react";
import { useEffect } from "react";
import TabName from "../../components/TabName";

const PendingCandidates = () => {
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
        label: "Jobs",
        field: "jobid",
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
        label: "Phone",
        field: "phone",
        sort: "asc",
        width: 50,
      },
      {
        label: "Email",
        field: "email",
        sort: "asc",
        width: 50,
      },
      {
        label: "Profession",
        field: "profession",
        sort: "asc",
        width: 50,
      },
      {
        label: "Primary",
        field: "primary",
        sort: "asc",
        width: 50,
      },
      {
        label: "Job Type",
        field: "jobtype",
        sort: "asc",
        width: 50,
      },

      {
        label: "Available From",
        field: "available",
        sort: "asc",
        width: 50,
      },
      {
        label: "State",
        field: "state",
        sort: "asc",
        width: 50,
      },
      {
        label: "Location Preference",
        field: "location",
        sort: "asc",
        width: 50,
      },
      {
        label: "Referral",
        field: "referral",
        sort: "asc",
        width: 50,
      },
      {
        label: "Traveler",
        field: "traveler",
        sort: "asc",
        width: 50,
      },
      {
        label: "Prv",
        field: "prv",
        sort: "asc",
        width: 50,
      },
      {
        label: "Create Date ",
        field: "notes",
        sort: "asc",
        width: 50,
      },
    ],
    rows: rows,
  };
  return (
    <>
      <div className="container-fluid tab-container">
        <TabName tabname="Pending" />
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

export default PendingCandidates;
