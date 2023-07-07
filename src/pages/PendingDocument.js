import React from "react";
import HeaderBreadcrumbs from "../components/HeaderBreadcrumbs";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import DatalistInput from "react-datalist-input";
import UploadDocsAPI from "../API/Documents/UploadDocsAPI";
import GetDocById from "../API/Documents/GetDocById";
import DeleteDocument from "../API/Documents/DeleteDocument";
import axios from "axios";
import { vercelHost } from "../static";
import moment from "moment/moment";
import { AiOutlinePlus } from "react-icons/ai";
import { HiOutlineDownload } from "react-icons/hi";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import GetAllDoc from "../API/Documents/GetAllDoc";
import swal from "sweetalert";

const PendingDocument = () => {
  const [uploadDocResult, setUploadDocResult] = useState([]);
  const [documentData, setDocumentDetails] = useState([]);
  const [filename, setFileName] = useState("");
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [expiryDate, setExpiryDate] = useState(false);
  const formattedDate = moment(expiryDate).format("MM/DD/YYYY");

  //validation******************************************************************

  const Reminder = () => {};

  useEffect(() => {
    GetAllDoc(setDocumentDetails, setLoading);
  }, []);

  //table *********************************************************************

  var rows = [];

  const CheckValidity = (ele) => {
    const date = new Date();
    // Add 60 Days
    date.setDate(date.getDate() + 60);
    const sixtyDays = moment(date).format("MM/DD/YYYY");
    const currDate = moment(ele.expiryDate).format("MM/DD/YYYY");
    // const currDate = moment(date).format("DD/MM/YYYY");
    const currExpiryDate = moment().format("MM/DD/YYYY");
    if (currExpiryDate === currDate) {
      swal({
        title: "Expiration Alert?",
        text:
          "Documents are about to expired. Do you want to delete expired documents?",
        icon: "warning",
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal({
            title: "Deleted Successfully",
            text: "Documents are deleted successfully.",
            icon: "success",
          });
          DeleteDocument(ele);

          window.location.reload();
        }
      });
    } else {
      return;
    }
  };
  const date = new Date();
  const Year = date.getFullYear();
  // Add 60 Days

  date.setDate(date.getDate() + 60);
  const sixtyDays = moment(date).format("MM/DD/YYYY");
  const expiryDateData = documentData.filter((item, index) => {
    if (item.expiryDate !== null) {
      if (item.expiryDate.includes(Year)) {
        return item.expiryDate <= sixtyDays;
      }
    }
  });

  const FilterWithNew = () => {
    const NewData = expiryDateData.filter((item) =>
      item.documentName.includes("NEW")
    );
    for (let index = 0; index < NewData.length; index++) {
      const element = NewData[index];
      CheckValidity(element);
      rows.push({
        ...element,
        sNo: index + 1,

        status:
          element.documentName.includes("NEW") === true
            ? "Renewed Document"
            : "Old Document",
        action: (
          <>
            <Link
              to={element.documentPath}
              className="btn btn-success"
              style={{
                padding: "7px 13px",
                height: "33px",
                marginRight: "10px",
              }}
              target="__blank"
            >
              <i class="fa fa-eye"></i>
            </Link>
            <button
              className="btn btn-danger"
              style={{
                padding: "7px 13px",
                height: "33px",
                marginRight: "10px",
              }}
              onClick={() => DeleteDocument(element)}
            >
              <i class="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    }
  };

  useEffect(() => {
    FilterWithNew();
  });

  /* ------------------------------------------Adding Elements To Array-------------------------------- */

  const dataT = {
    columns: [
      {
        label: "S.No",
        field: "sNo",
        sort: "asc",
        width: 150,
      },
      {
        label: "Employee Id",
        field: "employeeId",
        sort: "asc",
        width: 150,
      },
      {
        label: "Document-Name",
        field: "documentName",
        sort: "asc",
        width: 150,
      },
      {
        label: "Document",
        field: "documentFileName",
        sort: "asc",
        width: 150,
      },

      {
        label: "Expiry Date",
        field: "expiryDate",
        sort: "asc",
        width: 100,
      },
      {
        label: "Status",
        field: "status",
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

  const handleIMage = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="heading">
          <HeaderBreadcrumbs
            meta={"Documents"}
            main={"Pending"}
            heading={"Pending Documents"}
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
          striped
          bordered
          hover
          sorting={true}
          small
          data={dataT}
        />
      </div>
    </>
  );
};

export default PendingDocument;
