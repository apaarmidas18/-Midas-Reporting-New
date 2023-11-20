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
          accessorKey:"vmsCountsOpenMaps", //accessorFn used to join multiple data into a single cell
          id: "vmsCountsOpenMaps", //id is still required when using accessorFn instead of accessorKey
          header: "vmsCountsOpenMaps",
          size: 100,
          Cell: ({ renderedCellValue, row }) => (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
        <span> {renderedCellValue === null || renderedCellValue === undefined
    ? ""
    : Object.keys(renderedCellValue).map((key) => (
        [key, " : ", renderedCellValue[key], <br key={key + "-br"} />]
      ))}</span>
            </Box>
          ),
        },
        {
            accessorKey:"vmsCountsNonOpenMaps", //accessorFn used to join multiple data into a single cell
            id: "vmsCountsNonOpenMaps", //id is still required when using accessorFn instead of accessorKey
            header: "vmsCountsNonOpenMaps",
            size: 100,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
       
          <span> {renderedCellValue === null || renderedCellValue === undefined
      ? ""
      : Object.keys(renderedCellValue).map((key) => (
          [key, " : ", renderedCellValue[key], <br key={key + "-br"} />]
        ))}</span>
              </Box>
            ),
        },
        {
          accessorKey:"updateTime", //accessorFn used to join multiple data into a single cell
          id: "updateTime", //id is still required when using accessorFn instead of accessorKey
          header: "updateTime",
          size: 100,
          Cell: ({ renderedCellValue, row }) => (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
     
        <span>{moment(renderedCellValue).format("MMMM Do YYYY, h:mm:ss a")}</span>
            </Box>
          ),
      }

        
      ],
    },
  ]