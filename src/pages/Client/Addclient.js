import React from "react";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import CreateClient from "../../API/Master/Client/CreateClient";
import { useState } from "react";
import Button from "../../components/atoms/Button";
import InputField from "../../components/atoms/InputField";

const Addclient = () => {
  const [formState, setFormState] = useState(true);
  const userData = localStorage.getItem("User");
  const user = JSON.parse(userData);
  const navigate = useNavigate();
  //validation******************************************************************
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      address: "",
      phone: "",
      contactPersonName: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      address: Yup.string().required("Required"),
      phone: Yup.string().required("Required"),
      contactPersonName: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      CreateClient(values, navigate);
      // setFormState(values);
    },
  });
  //validation**************************************************************************8

  return (
    <>
      <div className="container-fluid">
        <div className="heading ">
          <HeaderBreadcrumbs
            meta={"Client"}
            main={"Add Client"}
            heading={"Create Client"}
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
              <label for="email" class="form-label">
                Email address
              </label>
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
              <label for="name" class="form-label">
                Address
              </label>
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
            <div class="mb-3 col-md-6">
              <label for="name" class="form-label">
                Phone No
              </label>
              <InputField
                inptype="number"
                inpid="phone"
                inpchange={formik.handleChange}
                inpblur={formik.handleBlur}
                inpvalue={formik.values.phone}
                inpcontrol="phone"
              />

              <span className="text-danger">
                {formik.touched.phone && formik.errors.phone ? (
                  <div className="text-danger">{formik.errors.phone}</div>
                ) : null}
              </span>
            </div>
            <div class="mb-3 col-md-6">
              <label for="name" class="form-label">
                Contact-Person-Name
              </label>
              <InputField
                inptype="text"
                inpid="contactPersonName"
                inpchange={formik.handleChange}
                inpblur={formik.handleBlur}
                inpvalue={formik.values.contactPersonName}
                inpcontrol="contactPersonName"
              />

              <span className="text-danger">
                {formik.touched.contactPersonName &&
                formik.errors.contactPersonName ? (
                  <div className="text-danger">
                    {formik.errors.contactPersonName}
                  </div>
                ) : null}
              </span>
            </div>
          </div>
          <Button
            btnTitle="Create Client"
            btntype="submit"
            btnclass="btn btn-primary"
          />
        </form>
      </div>
    </>
  );
};

export default Addclient;
