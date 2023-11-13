import React from "react";
import { host, jobshost } from "../../static";

const GetAllJobs = async (setAllJobs, setIsloading) => {
  const vmsDetails = await JSON.parse(localStorage.getItem("VmsDetails"));
  const user = JSON.parse(localStorage.getItem("User"));
  var vmArr = [];
  const vms = await vmsDetails.filter((item, index) =>
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

    await fetch(`${jobshost}allvms/getAllOpenByVMSIdFlux`, options)
      .then((response) => response.json())

      .then((response) => {
        setIsloading(false);

        setAllJobs(Object.keys(response).map((item, index) => response[item]));
      })
      .catch((err) => console.error(err));
  }
};
export default GetAllJobs;

// const GetAllJobs = (setAllJobs, setIsloading) => {
//   var requestOptions = {
//     method: "Get",
//     redirect: "follow",
   
//   };

//   fetch("http://192.168.1.172:9000/alldata", requestOptions)
//     .then((response) => response.json())
//     .then((response) => {
//       if (response) {
//         return (
        
//           setAllJobs(Object.keys(response).map((item, index) => response[item])),
//           setIsloading(false)
//         );
//       }
//     })
//     .catch((error) => console.log("error", error));
// }

// export default GetAllJobs