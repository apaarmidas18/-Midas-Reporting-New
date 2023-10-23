import React from "react";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import CreateClient from "../../API/Master/Client/CreateClient";
import { useState } from "react";
import CreateVMS from "../../API/Master/VMS/CreateVMS";
import Button from "../../components/atoms/Button";
import InputField from "../../components/atoms/InputField";
import Label from "../../components/atoms/Label";

const Addvms = () => {
  const [formState, setFormState] = useState(true);
  const userData = localStorage.getItem("User");
  const user = JSON.parse(userData);
  const navigate = useNavigate();
  //validation******************************************************************
  const formik = useFormik({
    initialValues: {
      name: "",
      url: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      url: Yup.string().required("URL is required"),
    }),
    onSubmit: (values) => {
      CreateVMS(values, navigate);
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
            main={"Add VMS"}
            heading={"Create VMS"}
          />
        </div>
      </div>
      <div className="container-fluid round-border bg-white p-4 mt-4 rounded-2xl">
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div class="mb-3 col-md-6">
              <Label labelName="Name" labelFor="Name" />
              <InputField
                inptype="text"
                inpid="name"
                inpchange={formik.handleChange}
                inpblur={formik.handleBlur}
                inpvalue={formik.values.name}
                inpcontrol="name"
              />
              <span className="text-danger">
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-danger">{formik.errors.name}</div>
                ) : null}
              </span>
            </div>

            <div class="mb-3 col-md-6">
              <Label labelName="URL" labelFor="URL" />
              <InputField
                inptype="text"
                inpid="url"
                inpchange={formik.handleChange}
                inpblur={formik.handleBlur}
                inpvalue={formik.values.url}
                inpcontrol="url"
              />

              <span className="text-danger">
                {formik.touched.url && formik.errors.url ? (
                  <div className="text-danger">{formik.errors.url}</div>
                ) : null}
              </span>
            </div>
          </div>
          <Button
            btnTitle="Add VMS"
            btntype="submit"
            btnclass="btn btn-primary"
          />
        </form>
      </div>
    </>
  );
};

export default Addvms;
