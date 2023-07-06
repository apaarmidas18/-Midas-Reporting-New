import React from "react";
import { host } from "../../static";

const GetAllDoc = (setDocumentsDetails, setLoading) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(`${host}auth/employee/get-documents`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result) {
        return setDocumentsDetails(result), setLoading(false);
      } else {
        return setDocumentsDetails(result), setLoading(true);
      }
    })
    .catch((error) => console.log("error", error));
};

export default GetAllDoc;
