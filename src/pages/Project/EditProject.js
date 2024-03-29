import React from "react";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router";
import DatalistInput from "react-datalist-input";
import { useEffect } from "react";
import GetAllClients from "../../API/Master/Client/GetAllClients";
import { useState } from "react";
import GetFacilityByCId from "../../API/Master/Facitlity/GetFacilityByCId";
import GetAllVMSs from "../../API/Master/VMS/GetAllVMSs";
import EditProjectAPI from "../../API/Project/EditProject";
import GetUserByRollId from "../../API/User/GetUserByRollId";

const OCCUPATION = [
  {
    value: 1,

    label: "W2",
  },

  {
    value: 2,

    label: "C2C",
  },
  {
    value: 3,

    label: "1099",
  },
];

const PROJECT = [
  {
    value: 1,

    label: "Process",
  },

  {
    value: 2,

    label: "Joined",
  },
  {
    value: 3,

    label: "Completed",
  },
  {
    value: 4,

    label: "Backout",
  },
  {
    value: 5,

    label: "Terminated",
  },
];

const EditProject = () => {
  const userData = localStorage.getItem("User");
  const user = JSON.parse(userData);
  const [clientDetails, setClientDetails] = useState([]);
  const [facilityData, setFacilityData] = useState([]);
  const [vmsDetails, setVMSDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [onBoardingData, setOnBoardingData] = useState([]);
  const [editClientValue, setEditClientValue] = useState(true);
  const [editStartDate, setEditStartDate] = useState(true);
  const [editEndDate, setEditEndDate] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state;
  //validation******************************************************************
  const formik = useFormik({
    initialValues: {
      employeeCode: data.id,
      employeeId: data.employeId,
      clientName: data.client,
      facilityName: data.facility,
      vms: data.vms,
      organisation: data.organisation,
      occupationType: data.occupationType,
      projectStatus: data.status,
      designation: data.designation,
      recruiter: data.recruter,
      startDate: data.startDate,
      endDate: data.endDate,
      teamLeader: data.teamLeader,
      billRates: data.billRates,
      payRates: data.payRates,
      preDeim: data.preDeim,
      overTimeRates: data.overTimeRates,
      guaranteedHours: data.guaranteedHours,
      travelAllowance: data.travelAllowance,
      editRemarks: "",
      userName: "",
      userId: 0,
    },
    validationSchema: Yup.object({
      clientName: Yup.string().required("Required"),
      facilityName: Yup.string().required("Required"),
      vms: Yup.string().required("Required"),
      organisation: Yup.string().required("Required"),
      occupationType: Yup.string().required("Required"),
      projectStatus: Yup.string().required("Required"),
      designation: Yup.string().required("Required"),
      recruiter: Yup.string().required("Required"),
      startDate: Yup.string().required("Required"),
      endDate: Yup.string().required("Required"),
      teamLeader: Yup.string().required("Required"),
      billRates: Yup.string().required("Required"),
      payRates: Yup.string().required("Required"),
      preDeim: Yup.string().required("Required"),
      overTimeRates: Yup.string().required("Required"),
      editRemarks: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      EditProjectAPI(values, navigate, data);
      alert(JSON.stringify(values, null, 2));
      // setFormState(values);
    },
  });
  useEffect(() => {
    GetAllClients({ setClientDetails, setLoading });
    GetAllVMSs({ setVMSDetails, setLoading });
    GetUserByRollId({ setOnBoardingData });
  }, []);

  //validation**************************************************************************

  /* clientArrayModification */
  var ClienArr = [];

  clientDetails.map((item, index) =>
    ClienArr.push({ id: item.id, value: item.name })
  );
  /* clientArrayModification */
  /* facilityArrModification */
  var facilityArr = [];

  facilityData.map((item, index) =>
    facilityArr.push({ id: item.id, value: item.name })
  );
  /* facilityArrModification */
  /*VMSArrayModification */
  var VMSArray = [];

  vmsDetails.map((item, index) =>
    VMSArray.push({ id: item.id, value: item.name })
  );
  /* VMSArrayModification */
  return (
    <>
      <div className="container-fluid">
        <div className="heading">
          <HeaderBreadcrumbs
            meta={"Project"}
            main={"Edit Project"}
            heading={"Edit Project"}
          />
        </div>
      </div>
      <div className="container-fluid round-border bg-white p-4 mt-4 rounded-2xl">
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div class="mb-3 col-md-6">
              <label for="firstName" class="form-label">
                Employee-Code
              </label>
              <input
                type="text"
                class="form-control"
                id="employeeCode"
                aria-describedby="emailHelp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.employeeCode}
                controlId="employeeCode"
                disabled
              />
              <span className="text-danger">
                {formik.touched.employeeCode && formik.errors.employeeCode ? (
                  <div className="text-danger">
                    {formik.errors.employeeCode}
                  </div>
                ) : null}
              </span>
            </div>
            <div class="mb-3 col-md-6">
              <label for="firstName" class="form-label">
                Employee-ID
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
              <DatalistInput
                placeholder="Please Choose Client"
                label="Choose Client"
                name="clientName"
                value={formik.values.clientName}
                onSelect={(item) => {
                  formik.setFieldValue("clientName", item.value);
                  GetFacilityByCId(item.id, setFacilityData);
                }}
                items={ClienArr}
              />

              <span className="text-danger">
                {formik.touched.clientName && formik.errors.clientName ? (
                  <div className="text-danger">{formik.errors.clientName}</div>
                ) : null}
              </span>
            </div>

            <div class="mb-3 col-md-6">
              <DatalistInput
                placeholder="Please Choose Facility"
                label="Choose Facility"
                name="facilityName"
                value={formik.values.facilityName}
                onSelect={(item) =>
                  formik.setFieldValue("facilityName", item.value)
                }
                items={facilityArr}
              />
              <span className="text-danger">
                {formik.touched.facilityName && formik.errors.facilityName ? (
                  <div className="text-danger">
                    {formik.errors.facilityName}
                  </div>
                ) : null}
              </span>
            </div>

            <div class="mb-3 col-md-6">
              <DatalistInput
                placeholder="Please Select VMS"
                label="VMS"
                name="vms"
                value={formik.values.vms}
                onSelect={(item) => formik.setFieldValue("vms", item.value)}
                items={VMSArray}
              />
              <span className="text-danger">
                {formik.touched.vms && formik.errors.vms ? (
                  <div className="text-danger">{formik.errors.vms}</div>
                ) : null}
              </span>
            </div>

            <div class="mb-3 col-md-6">
              <label for="firstName" class="form-label">
                Organisation
              </label>
              <input
                type="text"
                class="form-control"
                id="organisation"
                aria-describedby="emailHelp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.organisation}
                controlId="organisation"
              />
              <span className="text-danger">
                {formik.touched.organisation && formik.errors.organisation ? (
                  <div className="text-danger">
                    {formik.errors.organisation}
                  </div>
                ) : null}
              </span>
            </div>

            <div className="col-md-6">
              <label
                className="form-label"
                for="exampleFormControlSelect2"
                style={{ marginBottom: "8px" }}
              >
                Occupation-Type
              </label>

              <select
                class="form-select"
                aria-label="Default select example"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="occupationType"
                value={formik.values.occupationType}
              >
                <option selected>Open this select menu</option>
                {OCCUPATION.map((item, index) => {
                  return <option value={item.value}>{item.label}</option>;
                })}
              </select>
              <span className="text-danger">
                {formik.touched.occupationType &&
                formik.errors.occupationType ? (
                  <div className="text-danger">
                    {formik.errors.occupationType}
                  </div>
                ) : null}
              </span>
            </div>

            <div className="col-md-6">
              <label
                className="form-label"
                for="exampleFormControlSelect2"
                style={{ marginBottom: "8px" }}
              >
                Project-Status
              </label>

              <select
                class="form-select"
                aria-label="Default select example"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="projectStatus"
                value={formik.values.projectStatus}
              >
                <option selected>Open this select menu</option>
                {PROJECT.map((item, index) => {
                  return <option value={item.label}>{item.label}</option>;
                })}
              </select>
              <span className="text-danger">
                {formik.touched.projectStatus && formik.errors.projectStatus ? (
                  <div className="text-danger">
                    {formik.errors.projectStatus}
                  </div>
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
                Recruiter
              </label>
              <input
                type="text"
                class="form-control"
                id="recruiter"
                aria-describedby="emailHelp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.recruiter}
                controlId="recruiter"
              />
              <span className="text-danger">
                {formik.touched.recruiter && formik.errors.recruiter ? (
                  <div className="text-danger">{formik.errors.recruiter}</div>
                ) : null}
              </span>
            </div>
            {editStartDate === true ? (
              <div class="mb-3 col-md-6">
                <label for="name" class="form-label">
                  Start Date
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="startDate"
                  aria-describedby="emailHelp"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.startDate}
                  controlId="startDate"
                  onClick={() => setEditStartDate(false)}
                />
                <span className="text-danger">
                  {formik.touched.startDate && formik.errors.startDate ? (
                    <div className="text-danger">{formik.errors.startDate}</div>
                  ) : null}
                </span>
              </div>
            ) : (
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
            )}

            {editEndDate === true ? (
              <div class="mb-3 col-md-6">
                <label for="name" class="form-label">
                  End Date
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="endDate"
                  aria-describedby="emailHelp"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.endDate}
                  controlId="endDate"
                  onClick={() => setEditEndDate(false)}
                />
                <span className="text-danger">
                  {formik.touched.endDate && formik.errors.endDate ? (
                    <div className="text-danger">{formik.errors.endDate}</div>
                  ) : null}
                </span>
              </div>
            ) : (
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
            )}

            <div class="mb-3 col-md-6">
              <label for="name" class="form-label">
                Team Leader
              </label>
              <input
                type="text"
                class="form-control"
                id="teamLeader"
                aria-describedby="emailHelp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.teamLeader}
                controlId="teamLeader"
              />
              <span className="text-danger">
                {formik.touched.teamLeader && formik.errors.teamLeader ? (
                  <div className="text-danger">{formik.errors.teamLeader}</div>
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
                Pay Rates
              </label>
              <input
                type="text"
                class="form-control"
                id="payRates"
                aria-describedby="emailHelp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.payRates}
                controlId="payRates"
              />
              <span className="text-danger">
                {formik.touched.payRates && formik.errors.payRates ? (
                  <div className="text-danger">{formik.errors.payRates}</div>
                ) : null}
              </span>
            </div>
            <div class="mb-3 col-md-6">
              <label for="name" class="form-label">
                Per Diem
              </label>
              <input
                type="text"
                class="form-control"
                id="preDeim"
                aria-describedby="emailHelp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.preDeim}
                controlId="preDeim"
              />
              <span className="text-danger">
                {formik.touched.preDeim && formik.errors.preDeim ? (
                  <div className="text-danger">{formik.errors.preDeim}</div>
                ) : null}
              </span>
            </div>

            <div class="mb-3 col-md-12">
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
                Guaranteed Hours (optional)
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
                Travel Allowance (optional)
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
            {console.log("formik.values;", formik.values)}
            {user.rollId <= 2 ? (
              <>
                {onBoardingData.length == 0 ||
                onBoardingData.length == undefined ? (
                  "No OnBaording User Exists"
                ) : (
                  <div className="col-md-12">
                    <label
                      className="form-label"
                      for="exampleFormControlSelect2"
                      style={{ marginBottom: "8px" }}
                    >
                      User-Name
                    </label>

                    <select
                      class="form-select"
                      aria-label="Default select example"
                      // value={formik.values.type}
                      onChange={(e) => {
                        const userValue = JSON.parse(e.target.value);
                        formik.setFieldValue("userName", userValue.name);
                        formik.setFieldValue("userId", userValue.id);
                      }}
                      name="userValues"
                    >
                      <option selected>Open this select menu</option>
                      {onBoardingData.map((item, index) => {
                        return (
                          <option value={JSON.stringify(item)}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                )}
              </>
            ) : (
              ""
            )}
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

export default EditProject;
