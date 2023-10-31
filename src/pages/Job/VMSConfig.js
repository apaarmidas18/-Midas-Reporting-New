import React, { useState, useEffect } from "react";
import NewHor from "../../components/NewHor";
import TabName from "../../components/TabName";
import { HiOutlineDownload } from "react-icons/hi";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { Sidebar_Context } from "../../components/hooks/ContextSidebar";
import DatalistInput from "react-datalist-input";
import GetManagerById from "../../API/Jobs/GetManagerById";
import { getState } from "../../service/storage";
import GetActiveVMSAPI from "../../API/Jobs/GetActiveVMSAPI";
import { useFormik } from "formik";
import * as Yup from "yup";
import AssignedVMS from "../../API/Jobs/VMS/AssignedVMS";
import GetAllAssignedVMS from "../../API/Jobs/VMS/GetAllAssignedVMS";

const VMSConfig = () => {
  const [loading, setLoading] = useState("");
  const [manager, setManager] = useState([]);
  const [vmsDetails, setVMSDetails] = useState([]);
  const [assignedVMS, setAssignedVMS] = useState([]);

  const { isSidebarExpanded } = useContext(Sidebar_Context);

  const Manager_Name = manager.map((item, index) => {
    return { id: item.id, value: item.name };
  });

  const VMS_Name = vmsDetails.map((item, index) => {
    return { id: item.id, value: item.vmsName };
  });

  //Validation
  const formik = useFormik({
    initialValues: {
      managerName: "",

      vmsName: "",
    },

    validationSchema: Yup.object({
      managerName: Yup.string().required("Account Manager is Required"),

      vmsName: Yup.string().required("VMS Name is Required"),
    }),

    onSubmit: (values) => {
      AssignedVMS(values);

      // alert(JSON.stringify(values, null, 2));

      // setFormState(values);
    },
  });
  //Row Styling ********************************************************************
  var rows = [];

  for (let index = 0; index < assignedVMS.length; index++) {
    const element = assignedVMS[index];
    const mid = manager.filter(
      (item, index) => item.id == element.accountManager && item.name
    );
    console.log(mid[0].name);
    rows.push({
      ...element,
      accountManager: mid[0].name,
    });
  }
  const columns = [
    {
      id: 1,
      selector: (row) => row.vmsName,
      name: "VMS Name",
      sortable: true,
      reorder: true,
      width: 10,
    },
    {
      id: 2,
      selector: (row) => row.accountManager,

      name: "Account Manager",
      sortable: true,
      reorder: true,
      width: 10,
    },
  ];
  console.log("rows", rows);

  useEffect(() => {
    GetManagerById({ setManager, setLoading });
    GetActiveVMSAPI({ setVMSDetails, setLoading });
    GetAllAssignedVMS({ setAssignedVMS, setLoading });
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
          <div class="d-flex mt-2 mb-2">
            <TabName tabname="VMS ASSIGNMENT" />
            <div className="right-data d-flex align-items-center">
              <span className="sync-data">
                Data sync: <br /> 5-mins ago
              </span>
            </div>
          </div>

          <div className="container tab-container mb-5 mt-3">
            <form onSubmit={formik.handleSubmit}>
              <div className="row align-items-center">
                <div className="col-md-5">
                  <DatalistInput
                    placeholder="Please Choose Manager"
                    label="Account Manager"
                    name="managerName"
                    items={Manager_Name}
                    onSelect={(item) => {
                      formik.setFieldValue("accountManager", item.id);
                      formik.setFieldValue("managerName", item.value);
                    }}
                    onBlur={formik.handleBlur}
                    value={formik.values.managerName}
                  />
                  <span className="text-danger">
                    {formik.touched.managerName && formik.errors.managerName ? (
                      <div className="text-danger">
                        {formik.errors.managerName}
                      </div>
                    ) : null}
                  </span>
                </div>
                <div className="col-md-5">
                  <DatalistInput
                    placeholder="Please Choose VMS"
                    label="VMS"
                    name="vmsName"
                    // onSelect={(item) => setFileName(item.value)}
                    items={VMS_Name}
                    onSelect={(item) => {
                      formik.setFieldValue("vmsName", item.value);
                    }}
                    onBlur={formik.handleBlur}
                    value={formik.values.vmsName}
                  />
                  <span className="text-danger">
                    {formik.touched.vmsName && formik.errors.vmsName ? (
                      <div className="text-danger">{formik.errors.vmsName}</div>
                    ) : null}
                  </span>
                </div>
                <div className="col-md-2 mt-3">
                  <button
                    type="submit"
                    onClick={() => assignedVMS}
                    className="btn job-common-btn "
                  >
                    Assign
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="job-table">
            <DataTable
              columns={columns}
              data={rows}
              pagination
              selectableRows
              //   onSelectedRowsChange={(row) => setSelectedRow(row.selectedRows)}
              dense
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default VMSConfig;
