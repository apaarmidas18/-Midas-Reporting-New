import React from "react";
import { host } from "../../../static";

const GetAllVMSs = ({ setVMSDetails, setLoading }) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(`${host}auth/project/get-all-vms`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result) {
        return setVMSDetails(result), setLoading(false);
      }
    })
    .catch((error) => console.log("error", error));
};

export default GetAllVMSs;
