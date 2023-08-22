import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { AiOutlinePlus } from "react-icons/ai";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import GetAllVMSs from "../../API/Master/VMS/GetAllVMSs";
import moment from "moment";
import { Link } from "react-router-dom";

const Viewvms = () => {
  const [VMSdetails, setVMSDetails] = useState([]);
  const [loading, setLoading] = useState("");
  var rows = [];

  useEffect(() => {
    GetAllVMSs({ setVMSDetails, setLoading });
  }, []);

  /* ------------------------------------------Adding Elements To Array-------------------------------- */
  for (let index = 0; index < VMSdetails.length; index++) {
    const element = VMSdetails[index];

    rows.push({
      ...element,
      createDate: moment(element.createDate).format("MM/DD/YYYY"),
      edit: (
        <Link
          type="button"
          class="edit-btn"
          state={{ data: element }}
          to={"/dashboard/edit-vms"}
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
        label: "Name",
        field: "name",
        sort: "asc",
        width: 150,
      },
      {
        label: "URL",
        field: "url",
        sort: "asc",
        width: 270,
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
          <HeaderBreadcrumbs meta={"VMS"} main={"List"} heading={"VMS List"} />
          <div className="button-group">
            <button className="export-btn" style={{ width: "110px" }}>
              <AiOutlinePlus size={20} /> New VMS
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

export default Viewvms;
