import React from "react";
import { host, jobshost } from "../../static";
// import { chost, host } from "../../static";

const GetAllJobs = (setAllJobs, setIsloading, vmsDetails) => {
  const user = JSON.parse(localStorage.getItem("User"));
  var vmArr = [];
  const vms = vmsDetails.filter((item, index) =>
    item.accountManager === user.id ? vmArr.push(item.vmsName) : []
  );
  if (vms.length === 0) {
    return "wait";
  } else {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: `{"vmsIds":${JSON.stringify(vmArr)}}`,
    };
    setIsloading(true);

    fetch(`${jobshost}allvms/getAllOpenByVMSIdFlux`, options)
      .then((response) => response.json())

      .then((response) => {
        setIsloading(false);

        setAllJobs(Object.keys(response).map((item, index) => response[item]));
      })
      .catch((err) => console.error(err));
  }
};
export default GetAllJobs;
/* response.source.job.map((item , index) =>  item["bill-rate-note"].replaceAll("![CDATA["  , "").replaceAll("]]" , "").replaceAll("!" , ""))); */
