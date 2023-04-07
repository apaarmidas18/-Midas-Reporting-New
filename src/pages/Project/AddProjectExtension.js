import React from "react";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router";
import CreateProject from "../../API/Project/CreateProject";
import { useEffect } from "react";
import GetAllClients from "../../API/Master/Client/GetAllClients";
import { useState } from "react";
import CreateExtension from "../../API/Extension/CreateExtension";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import GetAllExtensions from "../../API/Extension/GetAllExtensions";

const AddProjectExtension = () => {
  const userData = localStorage.getItem("User");
  const [extensions, setExtensions] = useState([]);
  const user = JSON.parse(userData);
  const [clientDetails, setClientDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state;
  //validation******************************************************************

  const formik = useFormik({
    initialValues: {
      projectId: data.projectId,
      projectCode: data.id,
      employeeId: data.employeId,
      designation: "",
      startDate: "",
      endDate: "",
      billRates: "",
      overTimeRates: "",
      guaranteedHours: "",
      travelAllowance: "",
    },
    validationSchema: Yup.object({
      projectId: Yup.string().required("Required"),
      projectCode: Yup.string().required("Required"),
      employeeId: Yup.string().required("Required"),
      designation: Yup.string().required("Required"),
      startDate: Yup.string().required("Required"),
      endDate: Yup.string().required("Required"),
      billRates: Yup.string().required("Required"),
      overTimeRates: Yup.string().required("Required"),
      guaranteedHours: Yup.string().required("Required"),
      travelAllowance: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      CreateExtension(values, navigate);
      alert(JSON.stringify(values, null, 2));
      // setFormState(values);
    },
  });

  const PId = data.id;
  useEffect(() => {
    GetAllClients({ setClientDetails, setLoading });
    // GetAllVMSs({ setVMSDetails, setLoading });
    GetAllExtensions({ setExtensions, setLoading, PId });
  }, []);
  //validation**************************************************************************

  //table *********************************************************************

  var rows = [];

  for (let index = 0; index < extensions.length; index++) {
    const element = extensions[index];

    rows.push({
      ...element,
      action: (
        <Link
          type="button"
          class="edit-btn"
          state={{ data: element }}
          to={"/dashboard/edit-extension"}
        >
          <i class="fa fa-pencil"></i>
        </Link>
      ),
    });
  }
  /* ------------------------------------------Adding Elements To Array-------------------------------- */

  const dataT = {
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
        field: "employeeId",
        sort: "asc",
        width: 150,
      },

      {
        label: "Designation",
        field: "designation",
        sort: "asc",
        width: 200,
      },
      {
        label: "Bill-Rates",
        field: "billRates",
        sort: "asc",
        width: 100,
      },
      {
        label: "Over-Time-Rates",
        field: "overTimeRates",
        sort: "asc",
        width: 150,
      },
      {
        label: "Guaranteed-Hours",
        field: "guaranteeHours",
        sort: "asc",
        width: 150,
      },
      {
        label: "Travel Allowance",
        field: "travelAllowance",
        sort: "asc",
        width: 100,
      },
      {
        label: "Edit",
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
            meta={"Project"}
            main={"Project Extension"}
            heading={"Project Extension"}
          />
        </div>
      </div>
      <div className="container-fluid round-border bg-white p-4 mt-4 rounded-2xl">
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div class="mb-3 col-md-6">
              <label for="firstName" class="form-label">
                Project-ID
              </label>
              <input
                type="text"
                class="form-control"
                id="projectId"
                aria-describedby="emailHelp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.projectId}
                controlId="projectId"
                disabled
              />
              <span className="text-danger">
                {formik.touched.projectId && formik.errors.projectId ? (
                  <div className="text-danger">{formik.errors.projectId}</div>
                ) : null}
              </span>
            </div>
            <div class="mb-3 col-md-6">
              <label for="firstName" class="form-label">
                Project-Code
              </label>
              <input
                type="text"
                class="form-control"
                id="projectCode"
                aria-describedby="emailHelp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.projectCode}
                controlId="projectCode"
                disabled
              />
              <span className="text-danger">
                {formik.touched.projectCode && formik.errors.projectCode ? (
                  <div className="text-danger">{formik.errors.projectCode}</div>
                ) : null}
              </span>
            </div>

            <div class="mb-3 col-md-6">
              <label for="firstName" class="form-label">
                Employee-Id
              </label>
              <input
                type="text"
                class="form-control"
                id="employeeId"
                aria-describedby="emailHelp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.employeeId}
                controlId="employeeId"
                disabled
              />
              <span className="text-danger">
                {formik.touched.employeeId && formik.errors.employeeId ? (
                  <div className="text-danger">{formik.errors.employeeId}</div>
                ) : null}
              </span>
            </div>

            <div class="mb-3 col-md-6">
              <label for="name" class="form-label">
                Designation
              </label>
              <input
                type="text"
                class="form-control"
                id="designation"
                aria-describedby="emailHelp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.designation}
                controlId="designation"
              />
              <span className="text-danger">
                {formik.touched.designation && formik.errors.designation ? (
                  <div className="text-danger">{formik.errors.designation}</div>
                ) : null}
              </span>
            </div>

            <div class="mb-3 col-md-6">
              <label for="name" class="form-label">
                Start Date
              </label>
              <input
                type="date"
                class="form-control"
                id="startDate"
                aria-describedby="emailHelp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.startDate}
                controlId="startDate"
              />
              <span className="text-danger">
                {formik.touched.startDate && formik.errors.startDate ? (
                  <div className="text-danger">{formik.errors.startDate}</div>
                ) : null}
              </span>
            </div>

            <div class="mb-3 col-md-6">
              <label for="name" class="form-label">
                End Date
              </label>
              <input
                type="date"
                class="form-control"
                id="endDate"
                aria-describedby="emailHelp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.endDate}
                controlId="endDate"
              />
              <span className="text-danger">
                {formik.touched.endDate && formik.errors.endDate ? (
                  <div className="text-danger">{formik.errors.endDate}</div>
                ) : null}
              </span>
            </div>

            <div class="mb-3 col-md-6">
              <label for="name" class="form-label">
                Bill Rates
              </label>
              <input
                type="text"
                class="form-control"
                id="billRates"
                aria-describedby="emailHelp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.billRates}
                controlId="billRates"
              />
              <span className="text-danger">
                {formik.touched.billRates && formik.errors.billRates ? (
                  <div className="text-danger">{formik.errors.billRates}</div>
                ) : null}
              </span>
            </div>

            <div class="mb-3 col-md-6">
              <label for="name" class="form-label">
                Over Time rates
              </label>
              <input
                type="text"
                class="form-control"
                id="overTimeRates"
                aria-describedby="emailHelp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.overTimeRates}
                controlId="overTimeRates"
              />
              <span className="text-danger">
                {formik.touched.overTimeRates && formik.errors.overTimeRates ? (
                  <div className="text-danger">
                    {formik.errors.overTimeRates}
                  </div>
                ) : null}
              </span>
            </div>
            <div class="mb-3 col-md-6">
              <label for="name" class="form-label">
                Guaranteed Hours
              </label>
              <input
                type="text"
                class="form-control"
                id="guaranteedHours"
                aria-describedby="emailHelp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.guaranteedHours}
                controlId="guaranteedHours"
              />
              <span className="text-danger">
                {formik.touched.guaranteedHours &&
                formik.errors.guaranteedHours ? (
                  <div className="text-danger">
                    {formik.errors.guaranteedHours}
                  </div>
                ) : null}
              </span>
            </div>
            <div class="mb-3 col-md-6">
              <label for="name" class="form-label">
                Travel Allowance
              </label>
              <input
                type="text"
                class="form-control"
                id="travelAllowance"
                aria-describedby="emailHelp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.travelAllowance}
                controlId="travelAllowance"
              />
              <span className="text-danger">
                {formik.touched.travelAllowance &&
                formik.errors.travelAllowance ? (
                  <div className="text-danger">
                    {formik.errors.travelAllowance}
                  </div>
                ) : null}
              </span>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
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

export default AddProjectExtension;
