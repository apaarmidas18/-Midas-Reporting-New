import { useMemo } from "react";
import React, { useEffect, useState } from "react";
import CustomModal from "../JobModal";
import JobAssignmentRole from "../molecule/JobAssignmentRole";
//MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
} from "material-react-table";
import { mkConfig, generateCsv, download } from "export-to-csv"; //or use your library of choice here
//Material UI Imports
import {
  Box,
  Button,
  ListItemIcon,
  MenuItem,
  Tooltip,
  Typography,
  lighten,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileDownloadDoneOutlined from "@mui/icons-material/FileDownloadDoneOutlined";
import AssignmentIndTwoTone from "@mui/icons-material/AssignmentIndTwoTone";
import FileDownloadDoneTwoTone from "@mui/icons-material/FileDownloadDoneTwoTone";
import FileDownloadOffTwoTone from "@mui/icons-material/FileDownloadOffTwoTone";

//Icons Imports
import { AccountCircle, Send } from "@mui/icons-material";
import moment from "moment";
import DataTable from "react-data-table-component";
import job_table_header from "../../utils/Jobs/tableheaderrs.js/job_table_header";
import assign_table_header from "../../utils/Jobs/tableheaderrs.js/assign_table_header";
import feeds_table_header from "../../utils/Jobs/tableheaderrs.js/feeds_table_header";
import BillCalculate from "./BillCalculate";
import UnassignJob from "../../API/Jobs/UnassignJob";

const TableGrid = (props) => {
  const {
    data,
    user,
    setSelected,
    selected,
    columnsss,
    dataa,
    userData,
    route,
    teamLead,
    recruiterData,
    setAssignedbyManager,
    setIsloading,
    setAllJobs,
  } = props;
  var rowsSelected = [];
  const [rowSelection, setRowSelection] = useState({});
  const [arrayState, setArrayState] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [value, setValue] = useState([]);
  var assign_columns = useMemo(() => assign_table_header, []);
  var job_columns = useMemo(() => job_table_header, []);
  var feeds_stats = useMemo(() => feeds_table_header, []);

  const columns =
    route == "assigned"
      ? assign_columns
      : route == "feeds"
      ? feeds_stats
      : job_columns;
  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const [show1, setShow1] = useState(false);
  const [selectedRowColor, setSelectedRowColor] = useState("");
  const [teamLeadID, setTeamLeadID] = useState([]);
  const { finalClickInfo, setFinalClickInfo } = props;
  const [dataByRole, setDataByRole] = useState([]);
  const [disabledRow, setdisabledRow] = useState(false);
  const handleShow1 = () => setShow1(true);
  const handleClose1 = () => setShow1(false);
  var datarow = [];

  // const handleCondotion =
  console.log(disabledRow);

  const table = useMaterialReactTable({
    columns,
    data,
    // enableColumnFilterModes: true,
    enableFullScreenToggle: true,
    enableColumnFilterModes: false,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    filterVariant: "multi-select",
    enableStickyHeader: true,
    enableRowActions: true,
    initialState: {
      showColumnFilters: false,
      showGlobalFilter: true,
      density: "compact",
      pagination: {
        pageSize: 30,
      },
    },
    paginationDisplayMode: "pages",
    getRowId: (row) => row.userId,
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <Tooltip title="Export All Data">
          <Button
            onClick={handleExportData}
            startIcon={<FileDownloadIcon />}
          ></Button>
        </Tooltip>
        <Button
          onClick={handleShow1}
          disabled={!table.getIsSomeRowsSelected() || user.rollId === 5}
          data-toggle={"tooltip"}
          startIcon={<AssignmentIndTwoTone />}
        >
          Assign Job
        </Button>

        <CustomModal
          open={show1}
          handleClose={handleClose1}
          children={
            <JobAssignmentRole
              dataByRole={dataByRole}
              teamLeadID={teamLeadID}
              finalClickInfo={arrayState}
              setFinalClickInfo={setFinalClickInfo}
              selected={selected}
              teamLead={teamLead}
              recruiterData={recruiterData}
              setAllJobs={setAllJobs}
              setIsloading={setIsloading}
            />
          }
          jobid={0}
          className={"assign-modal"}
        />
      </Box>
    ),

    renderRowActionMenuItems: ({ closeMenu, row }) => [
      <MenuItem
        onClick={() => {
          setValue(row.original);
          setModalShow(true);
          closeMenu();
        }}
      >
        Bill
      </MenuItem>,
      <MenuItem
        onClick={() => {
         UnassignJob(row.original, setAssignedbyManager, setIsloading);
          closeMenu();
        }}
      >
        UnAssign Job
      </MenuItem>,
    ],

    muiTableBodyRowProps: ({ row }) => ({
      onClick: async () => {
        console.log(rowSelection);
        if (route === "assigned") {
          if (row.original.finalUserAssignee !== 0) {
            setdisabledRow(true);
          } else {
            setRowSelection((prev) => ({
              ...prev,
              [row.id]: !prev[row.id],
            }));
          }
        } else {
          if (
            (user.rollId === 7 && row.original.amId === 0) ||
            row.original.amId === null ||
            row.original.amId === undefined
          ) {
            if (
              arrayState.includes(JSON.stringify(row.original.ProviderJobID)) ==
              true
            ) {
              var dataOut = arrayState.indexOf(
                JSON.stringify(row.original.ProviderJobID)
              );
              let a = arrayState.splice(dataOut, 1);
              return a;
            } else {
              arrayState.push(JSON.stringify(row.original.ProviderJobID));
            }
            setRowSelection((prev) => ({
              ...prev,
              [row.id]: !prev[row.id],
            }));
          } else if (
            (user.rollId === 6 && row.original.tlId === 0) ||
            row.original.tlId === null ||
            row.original.tlId === undefined
          ) {
            if (
              arrayState.includes(JSON.stringify(row.original.ProviderJobID)) ==
              true
            ) {
              var dataOut = arrayState.indexOf(
                JSON.stringify(row.original.ProviderJobID)
              );
              let a = arrayState.splice(dataOut, 1);
              return a;
            } else {
              arrayState.push(JSON.stringify(row.original.ProviderJobID));
            }
            setRowSelection((prev) => ({
              ...prev,
              [row.id]: !prev[row.id],
            }));
          } else {
            setdisabledRow(true);
          }
        }
      },

      selected: rowSelection[row.id],
      sx: {
        cursor: row.original.isAssigned === true ? "inherit" : "pointer",
        backgroundColor: row.original.isAssigned === true ? "#eee" : "inherit",
        "&:hover": {
          color: "red",
        },
      },
    }),

    state: { rowSelection },
    positionToolbarAlertBanner: "top",
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
    muiPaginationProps: {
      color: "secondary",
      rowsPerPageOptions: [30, 50, 100, 150],
      shape: "rounded",
      variant: "outlined",
    },
    renderDetailPanel: ({ row }) => (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div>
          <div className="row">
            <div className="col-md-12 d-flex">
              <div className="col-md-4 job-select">
                <label>Job-Description</label>
                <textarea
                  rows="8"
                  class="form-control"
                  id="exampleFormControlInput1"
                  value={row.original.Note}
                  readOnly
                />
              </div>
              <div className="row job-select-row">
                <div className="col-md-2 job-select">
                  <label>Job-ID</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    value={row.original.SourceID}
                    disabled
                  />
                </div>
                <div className="col-md-2 job-select">
                  <label>Job-Title</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    value={row.original.Title}
                    disabled
                  />
                </div>
                <div className="col-md-2 job-select">
                  <label>Job Type</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    value={
                      row.original.WorkType == "1"
                        ? "Travel"
                        : row.original.WorkType == "2"
                        ? "Perm"
                        : row.original.WorkType == "3"
                        ? "Per Diem"
                        : row.original.WorkType
                    }
                    disabled
                  />
                </div>
                <div className="col-md-2 job-select">
                  <label>Job Status</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    value={row.original.StatusString}
                    disabled
                  />
                </div>
                <div className="col-md-2 job-select">
                  <label>Job Profession</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    value={row.original.Degree}
                    disabled
                  />
                </div>
                <div className="col-md-2 job-select">
                  <label>Job Speciality</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    value={row.original.JobSpecialty}
                    disabled
                  />
                </div>
                <div className="col-md-2 job-select">
                  <label>Job Facility</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    value={row.original.Facility}
                    disabled
                  />
                </div>
                <div className="col-md-2 job-select">
                  <label>Job City</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    value={row.original.City}
                    disabled
                  />
                </div>
                <div className="col-md-2 job-select">
                  <label>Job State</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    value={row.original.State}
                    disabled
                  />
                </div>

                <div className="col-md-2 job-select">
                  <label>Job On Call Rate</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    value={`$ ${row.original.OnCallRate}`}
                    disabled
                  />
                </div>
                <div className="col-md-2 job-select">
                  <label>Job Bill Rate</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    value={`$ ${row.original.BillRate}`}
                    disabled
                  />
                </div>
                <div className="col-md-2 job-select">
                  <label>VMS Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    value={row.original.SourceName}
                    disabled
                  />
                </div>
                <div className="col-md-2 job-select">
                  <label>Job Start Date</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    value={moment(row.original.FormattedStartDate).format(
                      "MM/DD/YYYY"
                    )}
                    disabled
                  />
                </div>
                <div className="col-md-2 job-select">
                  <label>Job End Date</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    value={moment(row.original.EndDate).format("MM/DD/YYYY")}
                    disabled
                  />
                </div>
                <div className="col-md-2 job-select">
                  <label>Job Posted On</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    value={moment(row.original.PostDate).format("MM/DD/YYYY")}
                    disabled
                  />
                </div>
                <div className="col-md-2 job-select">
                  <label>Job Guaranteed Hours</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    value={row.original.GuaranteedHours}
                    disabled
                  />
                </div>
                <div className="col-md-2 job-select">
                  <label>Job Bonus</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    value={`$ ${row.original.Bonus}`}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    ),
    renderTopToolbar: ({ table }) => {
      const handleDeactivate = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert("deactivating " + row.getValue("name"));
        });
      };

      const handleActivate = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert("activating " + row.getValue("name"));
        });
      };

      const handleContact = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert("contact " + row.getValue("name"));
        });
      };
    },
  });
  console.log(value);
  return (
    <>
      <MaterialReactTable table={table} />
      {value.length !== 0 ? (
        <BillCalculate
          show={modalShow}
          onHide={() => setModalShow(false)}
          values={value}
        />
      ) : null}
    </>
  );
};

export default TableGrid;
