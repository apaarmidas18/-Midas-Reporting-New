import React from "react";
import { host, jobshost } from "../../static";

const GetAssignedJobs = (setAssignedJobs, setIsloading) => {
  const user = JSON.parse(localStorage.getItem("User"));

  const options = {
    method: "GET",
  };

  fetch(`${jobshost}jobAssignment/allAssignedToMe/${user.id}`, options)
    .then((response) => response.json())
    .then((response) => {
      console.log("response:", response);
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
