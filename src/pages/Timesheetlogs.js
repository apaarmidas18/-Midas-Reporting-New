import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import HeaderBreadcrumbs from "../components/HeaderBreadcrumbs";
import GetTimesheetLogs from "../API/ChangeLogs/GetTimesheetLogs";
import moment from "moment";

const Timesheetlogs = () => {
  const [timesheetLogs, setTimsheetLogs] = useState([]);
  const [loading, setLoading] = useState("");
  var rows = [];
  useEffect(() => {
    GetTimesheetLogs({ setTimsheetLogs, setLoading });
  }, []);
  console.log(timesheetLogs);
  /* ------------------------------------------Adding Elements To Array-------------------------------- */
  for (let index = 0; index < timesheetLogs.length; index++) {
    const element = timesheetLogs[index];

    rows.push({
      ...element,
      createDate: moment(element.createDate).format("MM/DD/YYYY"),
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
        label: "Timesheet-Id",
        field: "timeSheetId",
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
            meta={"Timesheet"}
            main={"List"}
            heading={"Timesheet List"}
          />
        </div>
      </div>
      <div className="container-fluid round-border bg-white mt-4 p-2 px-4">
        <MDBDataTable striped bordered hover sorting={true} small data={data} />
      </div>
    </>
  );
};

export default Timesheetlogs;
