import React from "react";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { CreateEmployee } from "../../API/Employee/CreateEmployee";
import Button from "../../components/atoms/Button";
import InputField from "../../components/atoms/InputField";
import Select from "../../components/atoms/Select";
import Label from "../../components/atoms/Label";

const COMPANYNAME = [
  {
    value: 1,

    label: "Midas Consulting",
  },
];
const AddEmployee = () => {
  const userData = localStorage.getItem("User");
  const user = JSON.parse(userData);
  const navigate = useNavigate();
  //validation******************************************************************

  const formik = useFormik({
    initialValues: {
      companyName: "",
      companyId: 0,
      firstName: "",
      lastName: "",
      dob: "",
      ssn: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      email: "",
      contactDetails: "",
    },
    validationSchema: Yup.object({
      companyName: Yup.string().required("Required"),
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      dob: Yup.string().required("Required"),
      ssn: Yup.string()
        .required("Social Security Number is required")
        .min(9, "Social Security Number Must be 9 Digits long")
        .max(9, "Social Security Number Must be 9 Digits long"),
      address: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
      zipCode: Yup.string()
        .required("Zipcode is required")
        .min(5, "Zipcode should not be long less than 5 digits")
        .max(5, "Zipcode should not be long more than 5 digits"),
      email: Yup.string().email("Invalid email address").required("Required"),
      contactDetails: Yup.string()
        .required("Contact-Number is required")
        .min(10, "Contact Number should not be long less than 10 digits")
        .max(10, "Contact Number should not be long more than 10 digits"),
    }),
    onSubmit: (values) => {
      CreateEmployee(values, navigate);
      alert(JSON.stringify(values, null, 2));
      // setFormState(values);
    },
  });

  console.log(formik.values);
  //validation**************************************************************************

  return (
    <>
      <div className="container-fluid">
        <div className="heading">
          <HeaderBreadcrumbs
            meta={"Employee"}
            main={"Add Employee"}
            heading={"Create New Employee"}
          />
        </div>
      </div>
      <div className="container-fluid round-border bg-white p-4 mt-4 rounded-2xl">
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-md-12">
              <Label
                labelName="Company Name"
                labelFor="Company Name"
                style={{ marginBottom: "8px" }}
              />
              <Select
                selectChange={(e) => {
                  const CompanyValues = JSON.parse(e.target.value);
                  formik.setFieldValue("companyName", CompanyValues.label);
                  formik.setFieldValue("companyId", CompanyValues.value);
                }}
                selectBlur={formik.handleBlur}
                array={COMPANYNAME}
                selectName="companyName"
              />

              {/* <select
                class="form-select"
                aria-label="Default select example"
                onChange={(e) => {
                  const CompanyValues = JSON.parse(e.target.value);
                  formik.setFieldValue("companyName", CompanyValues.label);
                  formik.setFieldValue("companyId", CompanyValues.value);
                }}
                onBlur={formik.handleBlur}
                name="companyName"
              >
                <option selected>Open this select menu</option>
                {COMPANYNAME.map((item, index) => {
                  return (
                    <option value={JSON.stringify(item)}>{item.label}</option>
                  );
                })}
              </select> */}
              <span className="text-danger">
                {formik.touched.companyName && formik.errors.companyName ? (
                  <div className="text-danger">{formik.errors.companyName}</div>
                ) : null}
              </span>
            </div>
            <div class="mb-3 col-md-6">
              <Label labelName="First Name" labelFor="First Name" />
              <InputField
                inptype="text"
                inpid="firstName"
                inpchange={formik.handleChange}
                inpblur={formik.handleBlur}
                inpvalue={formik.values.firstName}
                inpcontrol="firstName"
              />

              <span className="text-danger">
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className="text-danger">{formik.errors.firstName}</div>
                ) : null}
              </span>
            </div>
            <div class="mb-3 col-md-6">
              <Label labelName="Last Name" labelFor="Last Name" />
              <InputField
                inptype="text"
                inpid="lastName"
                inpchange={formik.handleChange}
                inpblur={formik.handleBlur}
                inpvalue={formik.values.lastName}
                inpcontrol="lastName"
              />

              <span className="text-danger">
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className="text-danger">{formik.errors.lastName}</div>
                ) : null}
              </span>
            </div>
            <div class="mb-3 col-md-6">
              <Label labelName="Date of Birth" labelFor="Date of Birth" />
              <InputField
                inptype="date"
                inpid="dob"
                inpchange={formik.handleChange}
                inpblur={formik.handleBlur}
                inpvalue={formik.values.dob}
                inpcontrol="dob"
              />

              <span className="text-danger">
                {formik.touched.dob && formik.errors.dob ? (
                  <div className="text-danger">{formik.errors.dob}</div>
                ) : null}
              </span>
            </div>
            <div class="mb-3 col-md-6">
              <Label
                labelName="Social Security Number"
                labelFor="Social Security Number"
              />
              <InputField
                inptype="text"
                inpid="ssn"
                inpchange={formik.handleChange}
                inpblur={formik.handleBlur}
                inpvalue={formik.values.ssn}
                inpcontrol="ssn"
              />

              <span className="text-danger">
                {formik.touched.ssn && formik.errors.ssn ? (
                  <div className="text-danger">{formik.errors.ssn}</div>
                ) : null}
              </span>
            </div>

            <div class="mb-3 col-md-12">
              <Label labelName="Address" labelFor="Address" />
              <InputField
                inptype="text"
                inpid="address"
                inpchange={formik.handleChange}
                inpblur={formik.handleBlur}
                inpvalue={formik.values.address}
                inpcontrol="address"
              />

              <span className="text-danger">
                {formik.touched.address && formik.errors.address ? (
                  <div className="text-danger">{formik.errors.address}</div>
                ) : null}
              </span>
            </div>
            <div class="mb-3 col-md-4">
              <Label labelName="City" labelFor="City" />
              <InputField
                inptype="text"
                inpid="city"
                inpchange={formik.handleChange}
                inpblur={formik.handleBlur}
                inpvalue={formik.values.city}
                inpcontrol="city"
              />
              <span className="text-danger">
                {formik.touched.city && formik.errors.city ? (
                  <div className="text-danger">{formik.errors.city}</div>
                ) : null}
              </span>
            </div>
            <div class="mb-3 col-md-4">
              <Label labelName="State" labelFor="State" />
              <InputField
                inptype="text"
                inpid="state"
                inpchange={formik.handleChange}
                inpblur={formik.handleBlur}
                inpvalue={formik.values.state}
                inpcontrol="state"
              />
              <span className="text-danger">
                {formik.touched.state && formik.errors.state ? (
                  <div className="text-danger">{formik.errors.state}</div>
                ) : null}
              </span>
            </div>

            <div class="mb-3 col-md-4">
              <Label labelName="Zipcode" labelFor="Zipcode" />
              <InputField
                inptype="text"
                inpid="zipCode"
                inpchange={formik.handleChange}
                inpblur={formik.handleBlur}
                inpvalue={formik.values.zipCode}
                inpcontrol="zipCode"
              />

              <span className="text-danger">
                {formik.touched.zipCode && formik.errors.zipCode ? (
                  <div className="text-danger">{formik.errors.zipCode}</div>
                ) : null}
              </span>
            </div>

            <div class="mb-3 col-md-6">
              <Label labelName="Email address" labelFor="Email address" />
              <InputField
                inptype="email"
                inpid="email"
                inpchange={formik.handleChange}
                inpblur={formik.handleBlur}
                inpvalue={formik.values.email}
                inpcontrol="email"
              />

              <span className="text-danger">
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-danger">{formik.errors.email}</div>
                ) : null}
              </span>
            </div>

            <div class="mb-3 col-md-6">
              <Label labelName="Contact-number" labelFor="Contact-number" />
              <InputField
                inptype="text"
                inpid="contactDetails"
                inpchange={formik.handleChange}
                inpblur={formik.handleBlur}
                inpvalue={formik.values.contactDetails}
                inpcontrol="contactDetails"
              />

              <span className="text-danger">
                {formik.touched.contactDetails &&
                formik.errors.contactDetails ? (
                  <div className="text-danger">
                    {formik.errors.contactDetails}
                  </div>
                ) : null}
              </span>
            </div>
          </div>
          <Button
            btnTitle="Create Employee"
            btntype="submit"
            btnclass="btn btn-primary"
          />
        </form>
      </div>
    </>
  );
};

export default AddEmployee;
