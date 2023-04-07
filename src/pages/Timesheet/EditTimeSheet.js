import React from "react";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import GetAllClients from "../../API/Master/Client/GetAllClients";
import { useState } from "react";
import { Link } from "react-router-dom";

import GetTimeSheetByPId from "../../API/Timesheet/GetTimeSheetByPId";
import EditTimesheet from "../../API/Timesheet/EditTimesheet";

const EditTimeSheet = () => {
  const userData = localStorage.getItem("User");
  const [viewTimeSheetTable, setViewTimeSheetTable] = useState([]);
  const user = JSON.parse(userData);
  const [clientDetails, setClientDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //validation******************************************************************

  const formik = useFormik({
    initialValues: {
      regularHours: "",
      breakHours: "",
      overTimeHours: "",
      holidayHours: "",
    },
    validationSchema: Yup.object({
      regularHours: Yup.string().required("Required"),
      breakHours: Yup.string().required("Required"),
      overTimeHours: Yup.string().required("Required"),
      holidayHours: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      EditTimesheet(values, navigate);
      alert(JSON.stringify(values, null, 2));
      // setFormState(values);
    },
  });

  const PId = 1;
  useEffect(() => {
    GetAllClients({ setClientDetails, setLoading });
    // GetAllVMSs({ setVMSDetails, setLoading });
    GetTimeSheetByPId({ setViewTimeSheetTable, setLoading, PId });
  }, []);
  //validation**************************************************************************

  return (
    <>
      <div className="container-fluid">
        <div className="heading">
          <HeaderBreadcrumbs
            meta={"Timesheet"}
            main={"Edit Timesheet"}
            heading={"Edit Time sheet of employee"}
          />
        </div>
      </div>
      <div className="container-fluid round-border bg-white p-4 mt-4 rounded-2xl">
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div class="mb-3 col-md-3">
              <label for="firstName" class="form-label">
                Regular-Hours
              </label>
              <input
                type="text"
                class="form-control"
                id="regularHours"
                aria-describedby="emailHelp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.regularHours}
                controlId="regularHours"
              />
              <span className="text-danger">
                {formik.touched.regularHours && formik.errors.regularHours ? (
                  <div className="text-danger">
                    {formik.errors.regularHours}
                  </div>
                ) : null}
              </span>
            </div>

            <div class="mb-3 col-md-3">
              <label for="firstName" class="form-label">
                Break-Hours
              </label>
              <input
                type="text"
                class="form-control"
                id="breakHours"
                aria-describedby="emailHelp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.breakHours}
                controlId="breakHours"
              />
              <span className="text-danger">
                {formik.touched.breakHours && formik.errors.breakHours ? (
                  <div className="text-danger">{formik.errors.breakHours}</div>
                ) : null}
              </span>
            </div>

            <div class="mb-3 col-md-3">
              <label for="name" class="form-label">
                Over-Time Hours
              </label>
              <input
                type="text"
                class="form-control"
                id="overTimeHours"
                aria-describedby="emailHelp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.overTimeHours}
                controlId="overTimeHours"
              />
              <span className="text-danger">
                {formik.touched.overTimeHours && formik.errors.overTimeHours ? (
                  <div className="text-danger">
                    {formik.errors.overTimeHours}
                  </div>
                ) : null}
              </span>
            </div>

            <div class="mb-3 col-md-3">
              <label for="name" class="form-label">
                Holiday Hours
              </label>
              <input
                type="text"
                class="form-control"
                id="holidayHours"
                aria-describedby="emailHelp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.holidayHours}
                controlId="holidayHours"
              />
              <span className="text-danger">
                {formik.touched.holidayHours && formik.errors.holidayHours ? (
                  <div className="text-danger">
                    {formik.errors.holidayHours}
                  </div>
                ) : null}
              </span>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">
            Edit
          </button>
        </form>
      </div>
    </>
  );
};

export default EditTimeSheet;
