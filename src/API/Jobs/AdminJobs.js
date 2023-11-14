import React from "react";
import { jobshost } from "../../static";

const AdminJobs = (setAllJobs, setLoading) => {
  var requestOptions = {
    method: "Get",
    redirect: "follow",
  };

  fetch(`${jobshost}allvms/getAllFeeds`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result) {
        return setAllJobs(result.payload), setLoading(false);
      }
    })
    .catch((error) => console.log("error",));
};

export default AdminJobs;
