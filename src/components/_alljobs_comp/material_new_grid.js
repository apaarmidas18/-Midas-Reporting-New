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
  } = props;
  var rowsSelected = [];
  const [rowSelection, setRowSelection] = useState({});
  const [arrayState, setArrayState] = useState([]);
  var assign_columns = useMemo(
    () => [
      {
        id: "Job-details", //id used to define `group` column
        columns: [
          {
            accessorFn: (row) => `${row.assignee}`, //accessorFn used to join multiple data into a single cell
            id: "assignee", //id is still required when using accessorFn instead of accessorKey
            header: "Job-Assignee",
            size: 100,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorFn: (row) => `${row.assigner}`, //accessorFn used to join multiple data into a single cell
            id: "assigner", //id is still required when using accessorFn instead of accessorKey
            header: "Job-Assigner",
            size: 100,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorFn: (row) => `${row.SourceID}`, //accessorFn used to join multiple data into a single cell
            id: "SourceID", //id is still required when using accessorFn instead of accessorKey
            header: "Job-Id",
            size: 100,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "WorkType", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "WorkType",
            size: 100,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>
                  {renderedCellValue == "1"
                    ? "Travel"
                    : renderedCellValue == "2"
                    ? "Perm"
                    : renderedCellValue == "3"
                    ? "Per-Diem"
                    : ""}
                </span>
              </Box>
            ),
          },

          {
            accessorKey: "StatusString", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "StatusString",
            size: 100,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "Priority", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Priority",
            size: 100,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "Degree", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Profession",
            size: 100,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "JobSpecialty", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Speciality",
            size: 100,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "Facility", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Facility",
            size: 100,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "City", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "City",
            size: 100,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "State", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "State",
            size: 100,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "FormattedStartDate", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Start Date",
            size: 100,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{JSON.stringify(renderedCellValue)}</span>
              </Box>
            ),
          },
          {
            accessorKey: "FormattedEndDate", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "End Date",
            size: 100,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{JSON.stringify(renderedCellValue)}</span>
              </Box>
            ),
          },
          {
            accessorKey: "Shift", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Shift",
            size: 100,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{JSON.stringify(renderedCellValue)}</span>
              </Box>
            ),
          },
          {
            accessorFn: (row) => `${row.DurationWeeks}`, //accessorFn used to join multiple data into a single cell
            id: "DurationWeeks", //id is still required when using accessorFn instead of accessorKey
            header: "DurationWeeks",
            size: 100,
          },

          {
            accessorKey: "BillRate", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            header: "Bill Rate",
            size: 100,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{JSON.stringify(renderedCellValue)}$</span>
              </Box>
            ),
          },
          {
            accessorKey: "SourceName", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "VMS-Name",
            size: 100,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "PostDate", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,

            header: "Post Date",
            size: 100,

            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>
                  {JSON.stringify(
                    moment(renderedCellValue).format("DD/MM/YYYY")
                  )}
                </span>
              </Box>
            ),
          },
        ],
      },
    ],
    []
  );
  var job_columns = useMemo(
    () => [
      {
        id: "Job-details", //id used to define `group` column
        columns: [
          {
            accessorFn: (row) => `${row.SourceID}`, //accessorFn used to join multiple data into a single cell
            id: "SourceID", //id is still required when using accessorFn instead of accessorKey
            header: "Job-Id",
            size: 100,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "WorkType", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "WorkType",
            size: 100,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>
                  {renderedCellValue == "1"
                    ? "Travel"
                    : renderedCellValue == "2"
                    ? "Perm"
                    : renderedCellValue == "3"
                    ? "Per-Diem"
                    : ""}
                </span>
              </Box>
            ),
          },

          {
            accessorKey: "StatusString", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "StatusString",
            size: 100,
            Cell: ({ renderedCellValue, row, cell }) => (
              <Box
                sx={(theme) => ({
                  backgroundColor:
                    cell.getValue() == "Closed"
                      ? theme.palette.error.dark
                      : cell.getValue() == "Cancelled" &&
                        cell.getValue() == "Frozen"
                      ? theme.palette.warning.dark
                      : theme.palette.success.dark,
                  borderRadius: "0.25rem",
                  color: "#fff",
                  maxWidth: "9ch",
                  p: "0.25rem",
                })}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>
                  {renderedCellValue === "O" ? "Open" : renderedCellValue}
                </span>
              </Box>
            ),
          },
          {
            accessorKey: "Priority", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Priority",
            size: 100,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "Degree", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "multi-select",
            header: "Profession",
            size: 100,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "JobSpecialty", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "multi-select",
            header: "Speciality",
            size: 100,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "Facility", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "multi-select",
            header: "Facility",
            size: 100,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "City", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "City",
            size: 100,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "State", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "State",
            size: 100,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "FormattedStartDate", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Start Date",
            size: 100,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "FormattedEndDate", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "End Date",
            size: 100,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "Shift", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Shift",
            size: 100,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorFn: (row) => `${row.DurationWeeks}`, //accessorFn used to join multiple data into a single cell
            id: "DurationWeeks", //id is still required when using accessorFn instead of accessorKey
            header: "DurationWeeks",
            size: 100,
          },

          {
            accessorKey: "BillRate", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            header: "Bill Rate",
            size: 100,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "SourceName", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "VMS-Name",
            size: 100,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "PostDate", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,

            header: "Post Date",
            size: 100,

            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{moment(renderedCellValue).format("DD/MM/YYYY")}</span>
              </Box>
            ),
          },
        ],
      },
    ],
    []
  );
  const columns = route == "assigned" ? assign_columns : job_columns;
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
  const [teamLeadID, setTeamLeadID] = useState([]);
  const { finalClickInfo, setFinalClickInfo } = props;
  const [dataByRole, setDataByRole] = useState([]);
  const [disabledRow, setdisabledRow] = useState(false);
  const handleShow1 = () => setShow1(true);
  const handleClose1 = () => setShow1(false);
  var datarow = [];

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
    filterVariant: 'multi-select',

    enableRowActions: (row) =>
      row.amId >= 0 && user.rollId === 7 ? false : true,
    initialState: {
      showColumnFilters: false,
      showGlobalFilter: true,
      density: "compact",
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
        <Button onClick={handleExportData} startIcon={<FileDownloadIcon />}>
        </Button>
        </Tooltip>
        <Button
          onClick={handleShow1}
          disabled={
            (!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()) ||
            user.rollId === 5
          }
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
            />
          }
          jobid={0}
          className={"assign-modal"}
        />
      </Box>
    ),
    muiTableBodyRowProps: ({ row }) => ({
      onClick: async () => {
        {
          user.rollId == 7 ||
          (user.rollId == 5 && row.original.amId) ||
          row.original.tlId >= 0
            ? setdisabledRow(true)
            : setRowSelection((prev) => ({
                ...prev,
                [row.id]: !prev[row.id],
              }));
        }

        if (row.original.ProviderJobID) {
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
        } else {
          return null;
        }
      },
      selected: rowSelection[row.id],
      sx: {
        cursor: "pointer",
      },
    }),
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },

    positionToolbarAlertBanner: "top",
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
    muiPaginationProps: {
      color: "secondary",
      rowsPerPageOptions: [10, 50, 100, 150],
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
            <div className="col-md-2 job-select">
                  <label>Job-Description</label>
                  <textarea
                    rows="5"
                    class="form-control"
                    id="exampleFormControlInput1"
                    value={row.original.Note}
                    disabled
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
  console.log(arrayState);
  return (
    <MaterialReactTable
      table={table}
      // options={{
      //   pageSize:30,
      // }}
      
    />
  );
};

export default TableGrid;
