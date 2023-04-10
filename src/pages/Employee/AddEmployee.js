import React from "react";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { CreateEmployee } from "../../API/Employee/CreateEmployee";

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
      email: Yup.string()
        .email("Invalid email address")
        .required("Required"),
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
              <label
                className="form-label"
                for="exampleFormControlSelect2"
                style={{ marginBottom: "8px" }}
              >
                Company Name
              </label>

              <select
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
              </select>
              <span className="text-danger">
                {formik.touched.companyName && formik.errors.companyName ? (
                  <div className="text-danger">{formik.errors.companyName}</div>
                ) : null}
              </span>
            </div>
            <div class="mb-3 col-md-6">
              <label for="firstName" class="form-label">
                First Name
              </label>
              <input
                type="text"
                class="form-control"
                id="firstName"
                aria-describedby="emailHelp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                controlId="firstName"
              />
              <span className="text-danger">
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className="text-danger">{formik.errors.firstName}</div>
                ) : null}
              </span>
            </div>
            <div class="mb-3 col-md-6">
              <label for="name" class="form-label">
                Last Name
              </label>
              <input
                type="text"
                class="form-control"
                id="lastName"
                aria-describedby="emailHelp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                controlId="lastName"
              />
              <span className="text-danger">
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className="text-danger">{formik.errors.lastName}</div>
                ) : null}
              </span>
            </div>
            <div class="mb-3 col-md-6">
              <label for="name" class="form-label">
                Date of Birth
              </label>
              <input
                type="date"
                class="form-control"
                id="dob"
                aria-describedby="emailHelp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dob}
                controlId="dob"
              />
              <span className="text-danger">
                {formik.touched.dob && formik.errors.dob ? (
                  <div className="text-danger">{formik.errors.dob}</div>
                ) : null}
              </span>
            </div>
            <div class="mb-3 col-md-6">
              <label for="name" class="form-label">
                Social Security Number
              </label>
              <input
                type="text"
                class="form-control"
                id="ssn"
                aria-describedby="emailHelp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.ssn}
                controlId="ssn"
              />
              <span className="text-danger">
                {formik.touched.ssn && formik.errors.ssn ? (
                  <div className="text-danger">{formik.errors.ssn}</div>
                ) : null}
              </span>
            </div>

            <div class="mb-3 col-md-12">
              <label for="name" class="form-label">
                Address
              </label>
              <input
                type="text"
                class="form-control"
                id="address"
                aria-describedby="emailHelp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                controlId="address"
              />
              <span className="text-danger">
                {formik.touched.address && formik.errors.address ? (
                  <div className="text-danger">{formik.errors.address}</div>
                ) : null}
              </span>
            </div>
            <div class="mb-3 col-md-4">
              <label for="name" class="form-label">
                City
              </label>
              <input
                type="text"
                class="form-control"
                id="city"
                aria-describedby="emailHelp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
                controlId="city"
              />
              <span className="text-danger">
                {formik.touched.city && formik.errors.city ? (
                  <div className="text-danger">{formik.errors.city}</div>
                ) : null}
              </span>
            </div>
            <div class="mb-3 col-md-4">
              <label for="name" class="form-label">
                State
              </label>
              <input
                type="text"
                class="form-control"
                id="state"
                aria-describedby="emailHelp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.state}
                controlId="state"
              />
              <span className="text-danger">
                {formik.touched.state && formik.errors.state ? (
                  <div className="text-danger">{formik.errors.state}</div>
                ) : null}
              </span>
            </div>

            <div class="mb-3 col-md-4">
              <label for="name" class="form-label">
                Zipcode
              </label>
              <input
                type="text"
                class="form-control"
                id="zipCode"
                aria-describedby="emailHelp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.zipCode}
                controlId="zipCode"
              />
              <span className="text-danger">
                {formik.touched.zipCode && formik.errors.zipCode ? (
                  <div className="text-danger">{formik.errors.zipCode}</div>
                ) : null}
              </span>
            </div>

            <div class="mb-3 col-md-6">
              <label for="email" class="form-label">
                Email address
              </label>
              <input
                type="email"
                class="form-control"
                id="email"
                aria-describedby="emailHelp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                controlId="email"
              />
              <span className="text-danger">
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-danger">{formik.errors.email}</div>
                ) : null}
              </span>
            </div>

            <div class="mb-3 col-md-6">
              <label for="name" class="form-label">
                Contact-Number
              </label>
              <input
                type="text"
                class="form-control"
                id="contactDetails"
                aria-describedby="emailHelp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.contactDetails}
                controlId="contactDetails"
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
          <button type="submit" class="btn btn-primary">
            Create Employee
          </button>
        </form>
      </div>
    </>
  );
};

export default AddEmployee;
