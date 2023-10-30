import React from "react";
// import { chost, host } from "../../static";

const GetAllJobs = (setAllJobs, setIsloading, vms) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: '{"vmsId":"AHSA"}',
  };
  setIsloading(true);
  fetch("http://192.168.1.172:9291/allvms/getAllOpenByVMSId", options)
    .then((response) => response.json())
    .then((response) =>
      console.log(Object.keys(response).map((item, index) => console.log(item)))
    )
    .catch((err) => console.error(err));
};

export default GetAllJobs;
/* response.source.job.map((item , index) =>  item["bill-rate-note"].replaceAll("![CDATA["  , "").replaceAll("]]" , "").replaceAll("!" , ""))); */
