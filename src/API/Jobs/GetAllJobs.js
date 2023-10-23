import React from "react";
// import { chost, host } from "../../static";

const GetAllJobs = (setAllJobs, setIsloading) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "insomnia/2023.5.8",
    },
    body: '{"vmsId":"AHSA"}',
  };

  fetch("http://192.168.1.95:9292/getAllOpenByVMSId", options)
    .then((response) => response.json())
    .then((response) =>
      console.log(Object.keys(response).map((item, index) => console.log(item)))
    )
    .catch((err) => console.error(err));
};

export default GetAllJobs;
/* response.source.job.map((item , index) =>  item["bill-rate-note"].replaceAll("![CDATA["  , "").replaceAll("]]" , "").replaceAll("!" , ""))); */
