import React from "react";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import GetAllClients from "../../API/Master/Client/GetAllClients";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import CreateTimeSheet from "../../API/Timesheet/CreateTimeSheet";
import GetTimeSheetByPId from "../../API/Timesheet/GetTimeSheetByPId";
import moment from "moment";
import DatalistInput from "react-datalist-input";
import UploadDocsAPI from "../../API/Documents/UploadDocsAPI";
import GetDocById from "../../API/Documents/GetDocById";
const TAGS_OPTION = [
  { id: 1, value: "Driving-License" },
  { id: 2, value: "SSN-Card" },
  { id: 3, value: "Resume" },
  { id: 4, value: "HR-sheet" },
  { id: 5, value: "Skill-Checklist" },
  { id: 6, value: "Reference-1" },
  { id: 7, value: "Reference-2" },
  { id: 8, value: "BLS" },
  { id: 9, value: "ACLS" },
  { id: 10, value: "PALS" },
  { id: 11, value: "NBRC" },
  { id: 12, value: "NRP" },
  { id: 13, value: "TNCC" },
  { id: 14, value: "CPI" },
  { id: 15, value: "Nursing-License" },
  { id: 16, value: "State-License" },
  { id: 17, value: "COVID-Card" },
  { id: 18, value: "TB-Record" },
  { id: 19, value: "Physical" },
  { id: 20, value: "Flu-record" },
  { id: 21, value: "OSHA" },
  { id: 22, value: "Fit-Test" },
  { id: 23, value: "MMR" },
  { id: 24, value: "Hep-B" },
  { id: 25, value: "Varicella" },
  { id: 26, value: "TDap" },
  { id: 27, value: "Drug-Screening" },
  { id: 28, value: "Core-Competency" },
  { id: 29, value: "Speciality-Exam" },
  { id: 30, value: "Training" },
  { id: 31, value: "COA" },
  { id: 32, value: "Background-Check" },
  { id: 33, value: "Degree-Transcript" },
  { id: 34, value: "Fingerprinting" },
  { id: 35, value: "STATE-DOC" },
];
const UploadDoc = () => {
  const location = useLocation();
  const { data } = location.state;
  const [uploadDocResult, setUploadDocResult] = useState([]);
  const [documentData, setDocumentDetails] = useState([]);
  const [filename, setFileName] = useState("");
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  //validation******************************************************************
  console.log(documentData);
  useEffect(() => {
    GetDocById(setDocumentDetails, data.id, setLoading);
  }, []);
  //validation**************************************************************************

  //table *********************************************************************

  var rows = [];

  for (let index = 0; index < documentData.length; index++) {
    const element = documentData[index];

    rows.push({
      ...element,
      sNo: index + 1,
      action: (
        <Link
          class="btn btn-success"
          to={element.documentPath}
          target="__blank"
        >
          <i class="fa fa-eye"></i>
        </Link>
      ),
    });
  }
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
            meta={"Timesheet"}
            main={"Timesheet"}
            heading={"Time sheet of employee"}
          />
        </div>
      </div>
      <div className="container-fluid round-border bg-white p-4 mt-4 rounded-2xl">
        <div className="row" style={{ alignItems: "end" }}>
          <div class="mb-3 col-md-6">
            <DatalistInput
              placeholder="Please Choose Client"
              label="Choose Document"
              name="fileName"
              onSelect={(item) => setFileName(item.value)}
              items={TAGS_OPTION}
            />
          </div>
          <div
            class="mb-3 col-md-6"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label for="name" class="form-label">
              File
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/png, image/jpeg"
              onChange={handleIMage}
            />
          </div>
          <div class="mb-3 col-md-6">
            <button
              type="submit"
              class="btn btn-primary"
              onClick={() =>
                UploadDocsAPI({ data, filename, file, setUploadDocResult })
              }
            >
              Upload Document
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

export default UploadDoc;
