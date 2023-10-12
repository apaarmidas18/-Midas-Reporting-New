import React from "react";
import { host } from "../../static";

const GetAssignedJobs = (setAssignedJobs, setIsloading) => {
  const options = {
    method: "GET",
  };

  fetch(`${host}jobs/get-assigned-jobs`, options)
    .then((response) => response.json())
    .then((response) => {
      //   console.log("response:", response);
      if (response) {
        setAssignedJobs(response);
        setIsloading(false);
      } else {
        setIsloading(true);
      }
    })
    .catch((err) => console.error(err));
};

export default GetAssignedJobs;
