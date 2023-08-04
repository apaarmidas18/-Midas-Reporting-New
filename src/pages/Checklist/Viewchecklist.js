import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import GetAllChecklist from "../../API/Checklist/GetAllChecklist";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import DeleteChecklist from "../../API/Checklist/DeleteList";

const ViewChecklist = () => {
  const [checklist, setChecklist] = useState([]);
  const [loading, setLoading] = useState("");
  var rows = [];
  useEffect(() => {
    GetAllChecklist({ setChecklist, setLoading });
  }, []);

  /* ------------------------------------------Adding Elements To Array-------------------------------- */
  for (let index = 0; index < checklist.length; index++) {
    const element = checklist[index];

    rows.push({
      ...element,
      id: index + 1,
      action: (
        <div className="d-flex align-items-center justify-content-around">
          <Link
            type="button"
            class="edit-btn"
            to="/dashboard/view-list-details"
            state={{ data: element }}
          >
            <i class="fa fa-eye"></i>
          </Link>
          <Link
            type="button"
            class="edit-btn"
            onClick={() =>
              DeleteChecklist(element._id, setChecklist, setLoading)
            }
          >
            <i class="fa fa-trash"></i>
          </Link>
        </div>
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
        label: "Candidate-Name",
        field: "firstname",
        sort: "asc",
        width: 150,
      },
      {
        label: "Category",
        field: "categoryname",
        sort: "asc",
        width: 150,
      },
      {
        label: "Phone-Number",
        field: "phoneno",
        sort: "asc",
        width: 150,
      },
      {
        label: "E-mail",
        field: "email",
        sort: "asc",
        width: 270,
      },

      {
        label: "Date Of Birth",
        field: "dob",
        sort: "asc",
        width: 100,
      },
      {
        label: "SSN",
        field: "ssn",
        sort: "asc",
        width: 100,
      },
      {
        label: "Action",
        field: "action",
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
            meta={"Checklist"}
            main={"Checklist"}
            heading={"View Checklist"}
          />
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

export default ViewChecklist;
