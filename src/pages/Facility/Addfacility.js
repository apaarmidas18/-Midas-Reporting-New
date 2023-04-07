import React, { useState } from "react";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import CreateFacitlity from "../../API/Master/Facitlity/CreateFacitlity";
import DatalistInput from "react-datalist-input";

const CLIENT = [
  {
    value: 1,
    label: "Career Staff",
  },
  {
    value: 2,

    label: "Davin",
  },

  {
    value: 3,

    label: "Medical Solution",
  },

  {
    value: 4,

    label: "Medefis",
  },

  {
    value: 5,

    label: "Ingenesis",
  },

  {
    value: 6,

    label: "Adaptive",
  },
  {
    value: 7,

    label: "CHLA",
  },
  {
    value: 8,

    label: "Shiftwise",
  },
];

const Addfacility = () => {
  const [formState, setFormState] = useState(true);
  const userData = localStorage.getItem("User");
  const user = JSON.parse(userData);
  const navigate = useNavigate();
  //validation******************************************************************
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      clientName: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is Required"),
      address: Yup.string().required("Address is Required"),
      clientName: Yup.string().required("Please Choose Client"),
    }),
    onSubmit: (values) => {
      CreateFacitlity(values, navigate);
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
            meta={"Facility"}
            main={"Add Facility"}
            heading={"Create Facility"}
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

            <div class="mb-3">
              <DatalistInput
                placeholder="Please Choose Client"
                label="Choose Client"
                onSelect={(item) =>
                  formik.setFieldValue("clientName", item.value)
                }
                items={[
                  { id: "Career Staff", value: "Career Staff" },
                  { id: "Davin", value: "Davin" },
                  { id: "Medical Solution", value: "Medical Solution" },
                  { id: "Medefix", value: "Medefix" },
                  { id: "Igenesis", value: "Igenesis" },
                  { id: "Adaptive", value: "Adaptive" },
                  { id: "CHLA", value: "CHLA" },
                  { id: "Shiftwise", value: "Shiftwise" },
                ]}
              />
            </div>
          </div>
          <button type="submit" class="btn btn-primary">
            Create Facitlity
          </button>
        </form>
      </div>
    </>
  );
};

export default Addfacility;
