import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { AiOutlinePlus } from "react-icons/ai";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import GetAllClients from "../../API/Master/Client/GetAllClients";
import moment from "moment";
import { Link } from "react-router-dom";

const Viewclient = () => {
  const [clientDetails, setClientDetails] = useState([]);
  const [loading, setLoading] = useState("");
  var rows = [];

  useEffect(() => {
    GetAllClients({ setClientDetails, setLoading });
  }, []);

  /* ------------------------------------------Adding Elements To Array-------------------------------- */
  for (let index = 0; index < clientDetails.length; index++) {
    const element = clientDetails[index];

    rows.push({
      ...element,
      createDate: moment(element.createDate).format("DD/MM/YYYY"),
      edit: (
        <Link
          type="button"
          class="edit-btn"
          state={{ data: element }}
          to={"/dashboard/edit-client"}
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
        label: "S.No",
        field: "id",
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
        label: "Client Name",
        field: "contactPersonName",
        sort: "asc",
        width: 270,
      },
      {
        label: "Address",
        field: "address",
        sort: "asc",
        width: 200,
      },
      {
        label: "Phone",
        field: "phone",
        sort: "asc",
        width: 100,
      },
      {
        label: "E-mail",
        field: "email",
        sort: "asc",
        width: 150,
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
            meta={"Client"}
            main={"List"}
            heading={"Client List"}
          />
          <div className="button-group">
            <button className="export-btn" style={{ width: "110px" }}>
              <AiOutlinePlus size={20} /> New Client
            </button>
          </div>
        </div>
      </div>
      <div className="container-fluid round-border bg-white mt-4 p-2 px-4">
        <MDBDataTable striped bordered hover sorting={true} small data={data} />
      </div>
    </>
  );
};

export default Viewclient;
