import React from "react";
// import { jobshost } from "../../../static";

const GetVmsById = ({ setVMS }) => {
  const options = { method: "GET" };

  fetch(
    "http://192.168.1.172:9291/api/jobAssignment/getByVmsId/65402060a2e1d8551ef35a48",
    options
  )
    .then((response) => response.json())
    .then((response) => setVMS(response))
    .catch((err) => console.error(err));
};

export default GetVmsById;
