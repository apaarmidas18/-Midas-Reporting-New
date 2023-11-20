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
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useFormik } from "formik";
import * as Yup from "yup";
import AssignedVMS from "../../API/Jobs/VMS/AssignedVMS";
import GetAllAssignedVMS from "../../API/Jobs/VMS/GetAllAssignedVMS";
import GetUserByIdforVmsConfig from "../../API/Jobs/VMS/GetUserByIdforVmsConfig";
import DeleteVMS from "../../API/Jobs/VMS/DeleteVMS";
import active_vms from "../../utils/active_vms";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};

const VMSConfig = () => {
  const [loading, setLoading] = useState("");
  const [manager, setManager] = useState([]);
  const [assignedVMS, setAssignedVMS] = useState([]);
  const [managerName, setManagerName] = useState("");
  const [vmsArray, setVMS] = useState([]);
  const [vmsName, setVmsName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setVmsName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const { isSidebarExpanded } = useContext(Sidebar_Context);
  const Manager_Name = manager.map((item, index) => {
    return { id: item.id, value: item.name };
  });

  //Validation
  const formik = useFormik({
    initialValues: {
      managerName: "",
      vmsName: "",
    },
    validationSchema: Yup.object({
      managerName: Yup.string().required("Account Manager is Required"),
    }),
    onSubmit: (values) => {
      AssignedVMS(values, vmsName);
    },
  });
  console.log(vmsName);
  //Row Styling ********************************************************************
  var rows = [];
  for (let index = 0; index < assignedVMS.length; index++) {
    const element = assignedVMS[index];
    var name = "";
    manager
      .filter((item, index) => item.id === element.accountManager)
      .map((ite, index) => {
        return (name = ite.name);
      });

    rows.push({
      ...element,
      accountManager: name,
    });
  }
  const columns = [
    {
      id: 1,
      selector: (row) => row.accountManager,
      name: "Account Manager",
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
      // selector: (row) => row.vmsName,
      name: "Delete VMS",
      sortable: true,
      reorder: true,
      width: 10,
      cell: (row) => (
        <button className="delete-job" onClick={() => handleButtonDelete(row)}>
          <i class="fa-solid fa-trash"></i>
        </button>
      ),
    },
  ];

  const handleButtonDelete = (row) => {
    DeleteVMS(row.id);
    console.log("Button clicked for row:", row);
  };

  useEffect(() => {
    GetManagerById(setManager, setLoading, 7);
    GetAllAssignedVMS({ setAssignedVMS, setLoading });
  }, []);
  console.log(vmsArray);
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
                  <div>
                    <FormControl sx={{ mt: 3, width: 350 }}>
                      <InputLabel
                        size={"small"}
                        id="demo-multiple-checkbox-label"
                      >
                        VMS
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={vmsName}
                        onChange={handleChange}
                        input={<OutlinedInput label="Tag" />}
                        renderValue={(selected) => selected.join(", ")}
                        MenuProps={MenuProps}
                        sx={{ height: 40 }}
                      >
                        {active_vms.map((name) => (
                          <MenuItem key={name.value} value={name.value}>
                            <Checkbox
                              checked={vmsName.indexOf(name.value) > -1}
                            />
                            <ListItemText primary={name.value} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="col-md-2 mt-3">
                  <button
                    type="submit"
                    onClick={() => assignedVMS()}
                    className="btn job-common-btn"
                    disabled={vmsName.length === 0 ? true : false}
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
              dense
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default VMSConfig;
