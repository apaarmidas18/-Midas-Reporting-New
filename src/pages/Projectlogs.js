import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import HeaderBreadcrumbs from "../components/HeaderBreadcrumbs";
import GetProjectLogs from "../API/ChangeLogs/GetProjectLogs";
import moment from "moment/moment";

const Projectlogs = () => {
  const [projectLogs, setProjectLogs] = useState([]);
  const [loading, setLoading] = useState("");
  var rows = [];
  useEffect(() => {
    GetProjectLogs({ setProjectLogs, setLoading });
  }, []);

  /* ------------------------------------------Adding Elements To Array-------------------------------- */
  for (let index = 0; index < projectLogs.length; index++) {
    const element = projectLogs[index];

    rows.push({
      ...element,
      createDate: moment(element.createDate).format("DD/MM/YYYY"),
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
        label: "Project-Id",
        field: "projectId",
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
            meta={"Project"}
            main={"List"}
            heading={"Project List"}
          />
        </div>
      </div>
      <div className="container-fluid round-border bg-white mt-4 p-2 px-4">
        <MDBDataTable striped bordered hover sorting={true} small data={data} />
      </div>
    </>
  );
};

export default Projectlogs;
