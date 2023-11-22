import React from "react";
import { jobshost } from "../../../static";
import axios from "axios";

const ByManager = (setAssignedbyManager, setIsloading) => {
  console.log("APiCALled sdfdshfj")
  const user = JSON.parse(localStorage.getItem("User"));
  const options = {
    method: "POST",
    url: `${jobshost}jobAssignment/allAssignedByManager/${user.id}`,
    headers: {
      "Content-Type": "application/json",
      
    },
  };
  setIsloading(true)
  axios
    .request(options)
    .then(function (response) {
      if (response.data) {
        setAssignedbyManager(response.data);
        setIsloading(false);
      } else {
        setIsloading(true);
      }
    })
    .catch(function (error) {
      console.error(error);
    });
};

export default ByManager;
