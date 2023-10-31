import React from "react";
import { jobshost } from "../../../static";

const GetAllAssignedVMS = ({ setAssignedVMS, setLoading }) => {
  const options = {
    method: "GET",
  };

  fetch(`${jobshost}jobAssignment/getAllVmsConfig`, options)
    .then((response) => response.json())
    .then((response) => {
      if (response) {
        setAssignedVMS(response);
        setLoading(false);
      } else {
        setLoading(true);
      }
    })
    .catch((err) => console.error(err));
};

export default GetAllAssignedVMS;
