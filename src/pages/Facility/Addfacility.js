import React, { useState } from "react";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import CreateFacitlity from "../../API/Master/Facitlity/CreateFacitlity";
import DatalistInput from "react-datalist-input";
import { useEffect } from "react";
import GetAllClients from "../../API/Master/Client/GetAllClients";
import Button from "../../components/atoms/Button";
import InputField from "../../components/atoms/InputField";
import Label from "../../components/atoms/Label";

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
  const [clientDetails, setClientDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = localStorage.getItem("User");
  const user = JSON.parse(userData);
  const navigate = useNavigate();
  //validation******************************************************************
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      clientName: "",
      clientId: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is Required"),
      address: Yup.string().required("Address is Required"),
      clientName: Yup.string().required("Please Choose Client"),
    }),
    onSubmit: (values) => {
      CreateFacitlity(values, navigate);
    },
  });
  //validation**************************************************************************8
  var ClientData = [];
  useEffect(() => {
    GetAllClients({ setClientDetails, setLoading });
  }, []);
  clientDetails.map((item, index) => [
    ClientData.push({
      id: item.id,
      value: item.name,
    }),
  ]);

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

            <div class="mb-3">
              <DatalistInput
                placeholder="Please Choose Client"
                label="Choose Client"
                onSelect={(item) => {
                  formik.setFieldValue("clientId", item.id);
                  formik.setFieldValue("clientName", item.value);
                }}
                items={ClientData}
              />
            </div>
          </div>
          <Button
            btnTitle="Create Facility"
            btntype="submit"
            btnclass="btn btn-primary"
          />
        </form>
      </div>
    </>
  );
};

export default Addfacility;
