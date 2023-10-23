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
import InputField from "../../components/atoms/InputField";
import Label from "../../components/atoms/Label";

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
              <Label labelName="Project-ID" labelFor="Project-ID" />
              <InputField
                inptype="text"
                inpid="projectId"
                inpchange={formik.handleChange}
                inpblur={formik.handleBlur}
                inpvalue={formik.values.projectId}
                inpcontrol="projectId"
                disabled
              />
              <span className="text-danger">
                {formik.touched.projectId && formik.errors.projectId ? (
                  <div className="text-danger">{formik.errors.projectId}</div>
                ) : null}
              </span>
            </div>
            <div class="mb-3 col-md-6">
              <Label labelName=" Project-Code" labelFor=" Project-Code" />
              <InputField
                inptype="text"
                inpid="projectCode"
                inpchange={formik.handleChange}
                inpblur={formik.handleBlur}
                inpvalue={formik.values.projectCode}
                inpcontrol="projectCode"
                disabled
              />

              <span className="text-danger">
                {formik.touched.projectCode && formik.errors.projectCode ? (
                  <div className="text-danger">{formik.errors.projectCode}</div>
                ) : null}
              </span>
            </div>

            <div class="mb-3 col-md-6">
              <Label labelName=" Employee-Id" labelFor=" Employee-Id" />
              <InputField
                inptype="text"
                inpid="employeeId"
                inpchange={formik.handleChange}
                inpblur={formik.handleBlur}
                inpvalue={formik.values.employeeId}
                inpcontrol="employeeId"
                disabled
              />
              <span className="text-danger">
                {formik.touched.employeeId && formik.errors.employeeId ? (
                  <div className="text-danger">{formik.errors.employeeId}</div>
                ) : null}
              </span>
            </div>

            <div class="mb-3 col-md-6">
              <Label labelName=" Designation" labelFor=" Designation" />
              <InputField
                inptype="text"
                inpid="designation"
                inpchange={formik.handleChange}
                inpblur={formik.handleBlur}
                inpvalue={formik.values.designation}
                inpcontrol="designation"
              />
              <span className="text-danger">
                {formik.touched.designation && formik.errors.designation ? (
                  <div className="text-danger">{formik.errors.designation}</div>
                ) : null}
              </span>
            </div>

            <div class="mb-3 col-md-6">
              <Label labelName=" Start Date" labelFor=" Start Date" />
              <InputField
                inptype="date"
                inpid="startDate"
                inpchange={formik.handleChange}
                inpblur={formik.handleBlur}
                inpvalue={formik.values.startDate}
                inpcontrol="startDate"
              />
              <span className="text-danger">
                {formik.touched.startDate && formik.errors.startDate ? (
                  <div className="text-danger">{formik.errors.startDate}</div>
                ) : null}
              </span>
            </div>

            <div class="mb-3 col-md-6">
              <Label labelName=" End Date" labelFor=" End Date" />
              <InputField
                inptype="date"
                inpid="endDate"
                inpchange={formik.handleChange}
                inpblur={formik.handleBlur}
                inpvalue={formik.values.endDate}
                inpcontrol="endDate"
              />
              <span className="text-danger">
                {formik.touched.endDate && formik.errors.endDate ? (
                  <div className="text-danger">{formik.errors.endDate}</div>
                ) : null}
              </span>
            </div>

            <div class="mb-3 col-md-6">
              <Label labelName=" Bill Rates" labelFor=" Bill Rates" />
              <InputField
                inptype="text"
                inpid="billRates"
                inpchange={formik.handleChange}
                inpblur={formik.handleBlur}
                inpvalue={formik.values.billRates}
                inpcontrol="billRates"
              />
              <span className="text-danger">
                {formik.touched.billRates && formik.errors.billRates ? (
                  <div className="text-danger">{formik.errors.billRates}</div>
                ) : null}
              </span>
            </div>

            <div class="mb-3 col-md-6">
              <Label labelName=" Over Time rates" labelFor=" Over Time rates" />
              <InputField
                inptype="text"
                inpid="overTimeRates"
                inpchange={formik.handleChange}
                inpblur={formik.handleBlur}
                inpvalue={formik.values.overTimeRates}
                inpcontrol="overTimeRates"
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
              <Label
                labelName="  Guaranteed Hours"
                labelFor="  Guaranteed Hours"
              />
              <InputField
                inptype="text"
                inpid="guaranteedHours"
                inpchange={formik.handleChange}
                inpblur={formik.handleBlur}
                inpvalue={formik.values.guaranteedHours}
                inpcontrol="guaranteedHours"
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
              <Label labelName="Travel Allowance" labelFor="Travel Allowance" />
              <InputField
                inptype="text"
                inpid="travelAllowance"
                inpchange={formik.handleChange}
                inpblur={formik.handleBlur}
                inpvalue={formik.values.travelAllowance}
                inpcontrol="travelAllowance"
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
