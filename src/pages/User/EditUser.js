import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import { EditUserAPI } from "../../API/User/EditUser";

const ROLLSSUPERADMIN = [
  {
    value: 1,
    label: "Super-Admin",
  },
  {
    value: 2,

    label: "Admin",
  },

  {
    value: 3,

    label: "Moderator",
  },

  {
    value: 4,

    label: "On-Boarding",
  },

  {
    value: 5,

    label: "Recruiter",
  },

  {
    value: 6,

    label: "Team-Lead",
  },
];

const ADMINROLLS = [
  {
    value: 2,

    label: "Admin",
  },

  {
    value: 3,

    label: "Moderator",
  },

  {
    value: 4,

    label: "On-Boarding",
  },

  {
    value: 5,

    label: "Recruiter",
  },

  {
    value: 6,

    label: "Team-Lead",
  },
];

const STATUS = [
  {
    value: 1,

    label: "Active",
  },

  {
    value: 2,

    label: "Deactive",
  },
];

const USERTYPE = [
  {
    value: 1,

    label: "Internal",
  },

  {
    value: 2,

    label: "External",
  },
];

const EditUser = () => {
  const location = useLocation();
  const selectedUser = location.state.data;
  const userData = localStorage.getItem("User");
  const user = JSON.parse(userData);
  const ROLLS = user.rollId == 1 ? ROLLSSUPERADMIN : ADMINROLLS;
  const navigate = useNavigate();
  console.log(selectedUser);
  //validation******************************************************************
  const formik = useFormik({
    initialValues: {
      name: selectedUser.name,
      email: selectedUser.username,
      status: selectedUser.status,
      password: selectedUser.password,
      rollId: selectedUser.rollId,
      type: selectedUser.type,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Required"),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 5 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        )
        .required("password is required"),
      status: Yup.string().required("Required"),
      rollId: Yup.string().required("Required"),
      type: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      EditUserAPI(values, selectedUser, navigate);
    },
  });
  //validation**************************************************************************8

  return (
    <>
      <div className="container-fluid">
        <div className="heading">
          <HeaderBreadcrumbs
            meta={"User"}
            main={"Edit User"}
            heading={"Edit  User"}
          />
        </div>
      </div>
      <div className="container-fluid round-border bg-white p-4 mt-4 rounded-2xl">
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div class="mb-3 col-md-6">
              <label for="name" class="form-label">
                Name
              </label>
              <input
                type="text"
                class="form-control"
                id="name"
                aria-describedby="emailHelp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                controlId="name"
              />
              <span className="text-danger">
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-danger">{formik.errors.name}</div>
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
              <label for="password" class="form-label">
                Password
              </label>
              <input
                type="text"
                class="form-control"
                id="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <span className="text-danger">
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-danger">{formik.errors.password}</div>
                ) : null}
              </span>
            </div>
            <div className="col-md-6">
              <label
                className="form-label"
                for="exampleFormControlSelect2"
                style={{ marginBottom: "8px" }}
              >
                Status
              </label>

              <select
                class="form-select"
                aria-label="Default select example"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="status"
                value={formik.values.status}
              >
                <option selected>Open this select menu</option>
                {STATUS.map((item, index) => {
                  return <option value={item.value}>{item.label}</option>;
                })}
              </select>
              <span className="text-danger">
                {formik.touched.status && formik.errors.status ? (
                  <div className="text-danger">{formik.errors.status}</div>
                ) : null}
              </span>
            </div>
            <div className="col-md-6">
              <label
                className="form-label"
                for="exampleFormControlSelect2"
                style={{ marginBottom: "8px" }}
              >
                Roll
              </label>

              <select
                class="form-select"
                aria-label="Default select example"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.rollId}
                name="rollId"
              >
                <option selected>Open this select menu</option>
                {ROLLS.map((item, index) => {
                  return <option value={item.value}>{item.label}</option>;
                })}
              </select>
              <span className="text-danger">
                {formik.touched.rollId && formik.errors.rollId ? (
                  <div className="text-danger">{formik.errors.rollId}</div>
                ) : null}
              </span>
            </div>
            <div className="col-md-6">
              <label
                className="form-label"
                for="exampleFormControlSelect2"
                style={{ marginBottom: "8px" }}
              >
                User-Type
              </label>

              <select
                class="form-select"
                aria-label="Default select example"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.type}
                name="type"
              >
                <option selected>Open this select menu</option>
                {USERTYPE.map((item, index) => {
                  return <option value={item.value}>{item.label}</option>;
                })}
              </select>
              <span className="text-danger">
                {formik.touched.type && formik.errors.type ? (
                  <div className="text-danger">{formik.errors.type}</div>
                ) : null}
              </span>
            </div>
          </div>
          <button
            type="submit"
            class="btn btn-primary"
            // onClick={(values) => setFormState(values)}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default EditUser;
