import React from "react";
import { host, jobshost } from "../../static";
// import { chost, host } from "../../static";

const GetAllJobs = (setAllJobs, setIsloading, vms) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // body: `{"vmsId":"${vms}"}`,
    body: `{"vmsId":"${"MedicalSolutions"}"}`,
  };
  setIsloading(true);
  fetch(`${jobshost}allvms/getAllOpenByVMSId`, options)
    .then((response) => response.json())
    .then((response) => {
      setIsloading(false);
      setAllJobs(Object.keys(response).map((item, index) => response[item]));
    })
    .catch((err) => console.error(err));

  //   const options = {
  //     method: "GET",
  //     headers: { "User-Agent": "insomnia/2023.5.8" },
  //   };

  //   fetch("http://192.168.1.172:9000/alldata", options)
  //     .then((response) => response.json())
  //     .then((response) =>
  //       setAllJobs(response)
  //     )
  //     .catch((err) => console.error(err));
  // };
};
export default GetAllJobs;
/* response.source.job.map((item , index) =>  item["bill-rate-note"].replaceAll("![CDATA["  , "").replaceAll("]]" , "").replaceAll("!" , ""))); */
