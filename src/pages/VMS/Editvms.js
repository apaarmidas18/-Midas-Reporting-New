import React from "react";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import CreateVMS from "../../API/Master/VMS/CreateVMS";
import { EditVMSAPI } from "../../API/Master/VMS/EditVMS";

const Editvms = () => {
  const [formState, setFormState] = useState(true);
  const userData = localStorage.getItem("User");
  const location = useLocation();
  const selectedUser = location.state.data;
  const user = JSON.parse(userData);
  const navigate = useNavigate();
  //validation******************************************************************
  const vmsId = selectedUser.id;
  const formik = useFormik({
    initialValues: {
      name: selectedUser.name,
      url: selectedUser.url,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      url: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      EditVMSAPI(values, navigate, vmsId);
      alert(JSON.stringify(values, null, 2));
      // setFormState(values);
    },
  });
  //validation**************************************************************************8
  return (
    <>
      <div className="container-fluid">
        <div className="heading">
          <HeaderBreadcrumbs
            meta={"VMS"}
            main={"Edit VMS"}
            heading={"Edit VMS"}
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
              <label for="name" class="form-label">
                URL
              </label>
              <input
                type="text"
                class="form-control"
                id="url"
                aria-describedby="emailHelp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.url}
                controlId="url"
              />
              <span className="text-danger">
                {formik.touched.url && formik.errors.url ? (
                  <div className="text-danger">{formik.errors.url}</div>
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

export default Editvms;
