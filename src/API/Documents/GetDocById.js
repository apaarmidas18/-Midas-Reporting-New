import React from "react";
import { host } from "../../static";

const GetDocById = (setDocumentsDetails, EmpID, setLoading) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    `${host}auth/employee/get-all-documents?employeeId=${EmpID}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      if (result) {
        return setDocumentsDetails(result), setLoading(false);
      } else {
        return setDocumentsDetails(result), setLoading(true);
      }
    })
    .catch((error) => console.log("error"));
};

export default GetDocById;
