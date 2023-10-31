import React from "react";
import { host, jobshost } from "../../static";

const GetActiveVMSAPI = ({ setVMSDetails, setLoading }) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(`${jobshost}jobAssignment/getAllVmsConfig`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result) {
        return setVMSDetails(result.payload), setLoading(false);
      }
    })
    .catch((error) => console.log("error", error));
};

export default GetActiveVMSAPI;
