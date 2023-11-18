import React from "react"
import moment from "moment"
import {
    Box,
    Button,
    ListItemIcon,
    MenuItem,
    Tooltip,
    Typography,
    lighten,
  } from "@mui/material";
  
  export default [
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
  ]