import React from "react";
import { jobshost } from "../../static";

const AdminJobs = (setAllJobs, setIsloading) => {
  var requestOptions = {
    method: "Get",
    redirect: "follow",
  };
  setIsloading(true)
  fetch(`${jobshost}allvms/getAllFeeds`, requestOptions)
    .then((response) => response.json())
    .then((response) => {
        setIsloading(false);
       setAllJobs(Object.keys(response).map((item, index) => response[item]));
     
    })
    .catch((error) => console.log("error",));
};

export default AdminJobs;
