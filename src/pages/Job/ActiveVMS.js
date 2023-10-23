import React from "react";
import NewHor from "../../components/NewHor";
import { useContext } from "react";
import { Sidebar_Context } from "../../components/hooks/ContextSidebar";
import { useFormik } from "formik";
import * as Yup from "yup";
// import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import Label from "../../components/atoms/Label";
import InputField from "../../components/atoms/InputField";
import Button from "../../components/atoms/Button";
import { useNavigate } from "react-router";
import { useState } from "react";
import ActiveVMSAPI from "../../API/Jobs/ActiveVMSAPI";
import DataTable from "react-data-table-component";
import GetActiveVMSAPI from "../../API/Jobs/GetActiveVMSAPI";
import CustomModal from "../../components/JobModal";
import { useEffect } from "react";
import GetAllUsers from "../../API/User/GetAllUsers";

const ActiveVMS = () => {
  const { isSidebarExpanded } = useContext(Sidebar_Context);
  const [vmsDetails, setVMSDetails] = useState();
  const [loading, setLoading] = useState();
  const [userDataAll, setUserData] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const Account_manager = userDataAll.filter(
    (item, index) => item.rollId === 7
  );

  const navigate = useNavigate();

  const CustomButton = ({ onClick, text }) => (
    <button className="table-btn" onClick={onClick}>
      {text}
    </button>
  );
  const handleButtonClick = (id) => {
    setShow(true);
  };

  const columns = [
    {
      id: 1,
      selector: (row) => row.id,
      name: "VMS Id",
      sortable: true,
      reorder: true,
      width: 10,
    },
    {
      id: 2,
      selector: (row) => row.vmsName,
      name: "VMS Name",
      sortable: true,
      reorder: true,
      width: 10,
    },

    {
      id: 3,
      selector: (row) => row.vmsurl,
      name: "URL",
      sortable: true,
      reorder: true,
    },
    {
      id: 4,
      // selector: (row) => row.vmsurl,
      name: "Assign",
      sortable: true,
      reorder: true,
      cell: (row) => (
        <CustomButton onClick={() => handleButtonClick(row.id)} text="Assign" />
      ),
    },
  ];

  //validation******************************************************************
  const formik = useFormik({
    initialValues: {
      name: "",
      url: "",
      vmsId: "",
      vmsName: "",
      accountManagerName: "",
      accountManagerId: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      url: Yup.string().required("URL is required"),
    }),
    onSubmit: (values) => {
      // CreateVMS(values, navigate);
      ActiveVMSAPI(values);
    },
  });

  useEffect(() => {
    GetActiveVMSAPI({ setVMSDetails, setLoading });
    GetAllUsers({ setUserData, setLoading });
  }, []);
  return (
    <>
      <div
        class={"container-fluid table-container"}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <NewHor />
        <div
          className={
            isSidebarExpanded ? "container " : "container tab-container"
          }
        >
          <CustomModal
            open={show}
            handleClose={handleClose}
            children={
              <ModalContent
                formik={formik}
                vmsDetails={vmsDetails}
                Account_manager={Account_manager}
              />
            }
            jobid="Assign Job"
            className={"row "}
          />

          <div className="row">
            <h2 className="mt-3 mb-5">Add Active VMS</h2>
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
          <DataTable
            columns={columns}
            data={vmsDetails}
            pagination
            selectableRows
            // customStyles={customStyles}
            dense
          />
        </div>
      </div>
    </>
  );
};

const ModalContent = (props) => {
  const { formik, vmsDetails, Account_manager } = props;

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <Label
            labelName="VMS"
            labelFor="VMS"
            style={{ marginBottom: "8px" }}
          />
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={(item) => {
              const seldata = JSON.parse(item.target.value);
              formik.setFieldValue("vmsName", seldata.vmsName);
              formik.setFieldValue("vmsId", seldata.id);
            }}
          >
            <option selected>Open this select menu</option>

            {vmsDetails.map((item, index) => {
              return (
                <option value={JSON.stringify(item)}>{item.vmsName}</option>
              );
            })}
          </select>
        </div>

        <div className="col-md-6">
          <Label
            labelName="Account Manager"
            labelFor="Account Manager"
            style={{ marginBottom: "8px" }}
          />

          <select
            class="form-select"
            aria-label="Default select example"
            onChange={(item) => {
              const seldata = JSON.parse(item.target.value);

              formik.setFieldValue("accountManagerId", seldata.id);
              formik.setFieldValue("accountManagerName", seldata.name);
            }}
            onBlur={formik.handleBlur}
          >
            <option selected>Open this select menu</option>

            {Account_manager.map((item, index) => {
              return <option value={JSON.stringify(item)}>{item.name}</option>;
            })}
          </select>
        </div>

        <button className="btn btn-primary">Assign</button>
      </div>
    </div>
  );
};

export default ActiveVMS;
