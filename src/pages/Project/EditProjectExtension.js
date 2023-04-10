import React from "react";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import GetAllClients from "../../API/Master/Client/GetAllClients";
import { useState } from "react";
import { Link } from "react-router-dom";
import GetAllExtensions from "../../API/Extension/GetAllExtensions";
import EditExtension, {
  EditExtensionAPI,
} from "../../API/Extension/EditExtension";
import moment from "moment";

const EditProjectExtension = () => {
  const userData = localStorage.getItem("User");
  const [extensions, setExtensions] = useState([]);
  const user = JSON.parse(userData);
  const [clientDetails, setClientDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state;
  //validation******************************************************************

  const PId = data.id;
  const formik = useFormik({
    initialValues: {
      projectId: data.projectId,
      projectCode: data.id,
      employeeId: data.employeeId,
      designation: data.designation,
      startDate: data.startDate,
      endDate: data.endDate,
      billRates: data.billRates,
      overTimeRates: data.overTimeRates,
      guaranteeHours: data.guaranteeHours,
      travelAllowance: data.travelAllowance,
      editRemarks: "",
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
      guaranteeHours: Yup.string().required("Required"),
      travelAllowance: Yup.string().required("Required"),
      editRemarks: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      EditExtensionAPI(values, navigate, PId);
      alert(JSON.stringify(values, null, 2));
      // setFormState(values);
    },
  });

  useEffect(() => {
    GetAllClients({ setClientDetails, setLoading });
  }, []);
  //validation**************************************************************************

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
                value={moment(formik.values.startDate).format("YYYY-MM-DD")}
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
                id="guaranteeHours"
                aria-describedby="emailHelp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.guaranteeHours}
                controlId="guaranteeHours"
              />
              <span className="text-danger">
                {formik.touched.guaranteeHours &&
                formik.errors.guaranteeHours ? (
                  <div className="text-danger">
                    {formik.errors.guaranteeHours}
                  </div>
                ) : null}
              </span>
            </div>
            {console.log(formik.values)}
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
            <div class="form-group">
              <label
                for="exampleFormControlTextarea1"
                style={{
                  marginTop: "10px",
                  fontWeight: "500",
                  fontSize: "14px",
                }}
              >
                Add Remarks
              </label>
              <textarea
                class="form-control"
                id="editRemarks"
                rows="3"
                name="editRemarks"
                controlId="editRemarks"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.editRemarks}
              ></textarea>
              <span className="text-danger">
                {formik.touched.editRemarks && formik.errors.editRemarks ? (
                  <div className="text-danger">{formik.errors.editRemarks}</div>
                ) : null}
              </span>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProjectExtension;
