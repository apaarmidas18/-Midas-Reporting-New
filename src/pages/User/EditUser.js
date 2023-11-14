import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import { EditUserAPI } from "../../API/User/EditUser";
import Button from "../../components/atoms/Button";
import Select from "../../components/atoms/Select";
import InputField from "../../components/atoms/InputField";
import Label from "../../components/atoms/Label";
import GetAllTeamLeads from "../../API/User/GetAllTeamLeads";
import GetAllUsers from "../../API/User/GetAllUsers";

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

const EditUser = () => {
  const location = useLocation();
  const [teamLead, setTeamLead] = useState([]);
  const [userDataAll, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
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
      managerId : selectedUser.managerId,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
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

  useEffect(() => {
    GetAllTeamLeads({ setTeamLead });
    // GetActiveVMSAPI({ setVMSDetails });
    GetAllUsers({ setUserData, setLoading });
  }, []);

  const Account_manager = userDataAll.filter(
    (item, index) => item.rollId === 7
  );

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
                value={formik.values.rollId}
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
                value={formik.values.type}
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
                value={formik.values.managerId}
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
                  value={formik.values.managerId}
                >
                  <option selected>Open this select menu</option>

                  {Account_manager.map((item, index) => {
                    return <option value={item.id}>{item.name}</option>;
                  })}
                </select>
              </div>
            ) : null}
          </div>
          <Button
            btnTitle="Submit"
            btntype="submit"
            btnclass="btn btn-primary"
          />
        </form>
      </div>
    </>
  );
};

export default EditUser;
