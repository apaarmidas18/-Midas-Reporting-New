import React, { useState } from "react";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import { useFormik } from "formik";
import * as Yup from "yup";
import CreateUser from "../../API/User/CreateUser";
import { useNavigate } from "react-router";

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

const Adduser = () => {
  const [formState, setFormState] = useState(true);
  const userData = localStorage.getItem("User");
  const user = JSON.parse(userData);
  const ROLLS = user.rollId == 1 ? ROLLSSUPERADMIN : ADMINROLLS;
  const navigate = useNavigate();
  //validation******************************************************************
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      status: "",
      password: "",
      rollId: "",
      type: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is Required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is Required"),
      password: Yup.string()

        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,

          "Must Contain 5 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        )
        .required("Password is required"),
      status: Yup.string().required("Required"),
      rollId: Yup.string().required("Required"),
      type: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      CreateUser(values, navigate);
      // alert(JSON.stringify(values, null, 2));
      // setFormState(values);
    },
  });
  //validation**************************************************************************8

  return (
    <>
      <div className="container-fluid">
        <div className="heading">
          <HeaderBreadcrumbs
            meta={"User"}
            main={"Add User"}
            heading={"Create New User"}
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
                type="password"
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
                // value={formik.values.status}
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
                // value={formik.values.roll}
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
                // value={formik.values.type}
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
            Create User
          </button>
        </form>
      </div>
    </>
  );
};

export default Adduser;
