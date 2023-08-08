import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { HiOutlineDownload } from "react-icons/hi";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import GetAllProjects from "../../API/Project/GetAllProjects";
import { Link } from "react-router-dom";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const Manageproject = () => {
  const [projectDetails, setProjectDetails] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState("");

  var rows = [];

  useEffect(() => {
    GetAllProjects({ setProjectDetails, setLoading });
  }, []);

  const filtered = (filter) => {
    const data = projectDetails.filter((item, index) => item.status === filter);
    setFilteredData(data);
  };
  /* ------------------------------------------Adding Elements To Array-------------------------------- */

  const detail = filteredData.length === 0 ? projectDetails : filteredData;
  for (let index = 0; index < detail.length; index++) {
    const element = detail[index];

    rows.push({
      ...element,
      edit: (
        <Link
          type="button"
          class="edit-btn"
          state={{ data: element }}
          to={"/dashboard/edit-project"}
        >
          <i class="fa fa-pencil"></i>
        </Link>
      ),
      action: (
        <Link
          type="button"
          class="btn btn-danger"
          style={{ padding: "7px 13px", height: "33px" }}
          state={{ data: element }}
          to={"/dashboard/project-extension"}
        >
          <i
            class="fa-solid fa-plus"
            style={{
              color: "white",
            }}
          ></i>
        </Link>
      ),
      timesheet: (
        <Link
          type="button"
          class="btn btn-success"
          style={{ padding: "7px 13px", height: "33px" }}
          to={"/dashboard/timesheet"}
          state={{ data: element }}
        >
          <i class="fa fa-eye" style={{ color: "white" }}></i>
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
        label: "Project-ID",
        field: "projectId",
        sort: "asc",
        width: 150,
      },
      {
        label: "Emp-Id",
        field: "employeId",
        sort: "asc",
        width: 150,
      },
      {
        label: "Start Date",
        field: "startDate",
        sort: "asc",
        width: 150,
      },
      {
        label: "End Date",
        field: "endDate",
        sort: "asc",
        width: 150,
      },
      {
        label: "Organisation",
        field: "organisation",
        sort: "asc",
        width: 270,
      },
      {
        label: "Facility",
        field: "facility",
        sort: "asc",
        width: 200,
      },
      {
        label: "Designation",
        field: "designation",
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
        label: "Details",
        field: "edit",
        sort: "asc",
        width: 100,
      },
      {
        label: "Timesheet",
        field: "timesheet",
        sort: "asc",
        width: 150,
      },
      {
        label: "Project Extension",
        field: "action",
        sort: "asc",
        width: 100,
      },
    ],
    rows: rows,
  };
  return (
    <>
      <div className="container-fluid ">
        <div className="heading">
          <HeaderBreadcrumbs
            meta={"Project"}
            main={"List"}
            heading={"Project List"}
          />
          <div className="button-group">
            <button className="export-btn" style={{ width: "120px" }}>
              <HiOutlineDownload size={22} />
              <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="export-list"
                table="project-list-table"
                filename="Project List"
                sheet="Project List"
                buttonText=" Export List"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="container-fluid round-border bg-white mt-4 p-2 px-4">
        <div className="button-group">
          <button
            className="btn btn-success"
            onClick={() => filtered("Completed")}
          >
            Completed
          </button>
          <button
            className="btn btn-primary"
            onClick={() => filtered("Joined")}
          >
            Joined
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => filtered("Backout")}
          >
            Backout
          </button>
          <button className="btn btn-info" onClick={() => filtered("Pending")}>
            Pending
          </button>
          <button
            className="btn btn-danger"
            onClick={() => filtered("Process")}
          >
            Process
          </button>
          <button
            className="btn btn-dark"
            onClick={() => filtered("Terminated")}
          >
            Terminated
          </button>
        </div>
        <MDBDataTable
          id="project-list-table"
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

export default Manageproject;
