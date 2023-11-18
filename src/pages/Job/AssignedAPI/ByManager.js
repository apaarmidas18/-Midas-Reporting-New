import React from "react";
import { jobshost } from "../../../static";
import axios from "axios";

const ByManager = (setAssignedbyManager, setIsloading) => {
  const user = JSON.parse(localStorage.getItem("User"));
  const options = {
    method: "POST",
    url: `${jobshost}jobAssignment/allAssignedByManager/${user.id}`,
  };

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
