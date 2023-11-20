import React, { useEffect, useState } from "react";

import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";

import { useFormik } from "formik";

import * as Yup from "yup";

import CreateUser from "../../API/User/CreateUser";

import { useNavigate } from "react-router";

import GetAllTeamLeads from "../../API/User/GetAllTeamLeads";

import GetAllUsers from "../../API/User/GetAllUsers";
import GetActiveVMSAPI from "../../API/Jobs/GetActiveVMSAPI";
import Label from "../../components/atoms/Label";
import InputField from "../../components/atoms/InputField";
import Select from "../../components/atoms/Select";

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

  {
    value: 7,

    label: "Account-Manager",
  },
  {
    value: 8,

    label: "JR-User",
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
  {
    value: 7,

    label: "Account-Manager",
  },
  {
    value: 8,

    label: "JR-User",
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
    value: "Internal",

    label: "Internal",
  },

  {
    value: "External",

    label: "External",
  },
];

const Adduser = () => {
  const [teamLead, setTeamLead] = useState([]);
  // const [vmsDetails, setVMSDetails] = useState();
  const [userDataAll, setUserData] = useState([]);

  const [loading, setLoading] = useState(false);

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

      managerId: "",
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

      // number: Yup.string().required("Required"),
    }),

    onSubmit: (values) => {
      CreateUser(values, navigate);
      // alert(JSON.stringify(values, null, 2));
      // setFormState(values);
    },
  });

  //validation**************************************************************************8

  useEffect(() => {
    GetAllTeamLeads({ setTeamLead });
    // GetActiveVMSAPI({ setVMSDetails });
    GetAllUsers({ setUserData, setLoading });
  }, []);

  const Account_manager = userDataAll.filter(
    (item, index) => item.rollId === 7
  );

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
              <Label labelName="Name" labelFor="name" />
              <InputField
                inptype="text"
                inpid="name"
                inpchange={formik.handleChange}
                inpblur={formik.handleBlur}
                inpvalue={formik.values.name}
              />

              <span className="text-danger">
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-danger">{formik.errors.name}</div>
                ) : null}
              </span>
            </div>

            <div class="mb-3 col-md-6">
              <Label labelName="Email address" labelFor="email" />
              <InputField
                inptype="email"
                inpid="email"
                inpchange={formik.handleChange}
                inpblur={formik.handleBlur}
                inpvalue={formik.values.email}
              />

              <span className="text-danger">
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-danger">{formik.errors.email}</div>
                ) : null}
              </span>
            </div>

            <div class="mb-3 col-md-6">
              <Label labelName="Password" labelFor="Password" />
              <InputField
                inptype="password"
                inpid="password"
                inpchange={formik.handleChange}
                inpblur={formik.handleBlur}
                inpvalue={formik.values.password}
              />

              <span className="text-danger">
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-danger">{formik.errors.password}</div>
                ) : null}
              </span>
            </div>

            {/* <div class="mb-3 col-md-6">
              <Label labelName="Phone Number" labelFor="Phone Number" />
              <InputField
                inptype="number"
                inpid="number"
                inpchange={formik.handleChange}
                inpblur={formik.handleBlur}
                inpvalue={formik.values.number}
              />

              <span className="text-danger">
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-danger">{formik.errors.password}</div>
                ) : null}
              </span>
            </div> */}

            <div className="col-md-6">
              <Label
                labelName="Status"
                labelFor="Status"
                style={{ marginBottom: "8px" }}
              />
              <select
                class="form-select"
                aria-label="Default select example"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="status"
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
              <Label
                labelName="Role"
                labelFor="Role"
                style={{ marginBottom: "8px" }}
              />

              <select
                class="form-select"
                aria-label="Default select example"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
              <Label
                labelName="User-Type"
                labelFor="User-Type"
                style={{ marginBottom: "8px" }}
              />
              <select
                class="form-select"
                aria-label="Default select example"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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

            {formik.values.rollId == "5" ? (
              <div className="col-md-6">
                <Label
                  labelName="Team Leads"
                  labelFor="Team Leads"
                  style={{ marginBottom: "8px" }}
                />
                <select
                  class="form-select"
                  aria-label="Default select example"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="managerId"
                >
                  <option selected>Open this select menu</option>

                  {teamLead.map((item, index) => {
                    return <option value={item.id}>{item.name}</option>;
                  })}
                </select>
              </div>
            ) : null}

            {formik.values.rollId == "6" ? (
              <div className="col-md-6">
                <label
                  className="form-label"
                  for="exampleFormControlSelect2"
                  style={{ marginBottom: "8px" }}
                >
                  Account Manager
                </label>

                <select
                  class="form-select"
                  aria-label="Default select example"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="managerId"
                >
                  <option selected>Open this select menu</option>

                  {Account_manager.map((item, index) => {
                    return <option value={item.id}>{item.name}</option>;
                  })}
                </select>
              </div>
            ) : null}
          </div>

          <button type="submit" class="btn btn-primary">
            Create User
          </button>
        </form>
      </div>
    </>
  );
};

export default Adduser;
