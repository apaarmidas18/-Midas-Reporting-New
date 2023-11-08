import React from "react";
import { host, jobshost } from "../../static";
// import { chost, host } from "../../static";

<<<<<<< HEAD
const GetAllJobs = (setAllJobs, setIsloading, vms) => {
 if(vms==undefined){
  vms=[]
 }
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // body: `{"vmsIds":${vms}}`
    // body: `{"vmsIds":[${vms}]}`,
    // body: `{"vmsIds":['MedicalSolutions']}`,
    body: '{"vmsIds":["MedicalSolutions","Kruse","Medefis5","WorkforceSG","StafferLink"]}'
    // body: `{"vmsId":"${"MedicalSolutions"}"}`,
  };
  setIsloading(true);
=======
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
      // body: `{"vmsIds":[${vms}]}`,
      // body: `{"vmsIds":['MedicalSolutions']}`,
      // body: `{"vmsId":"${"MedicalSolutions"}"}`,
    };
    setIsloading(true);
    // const options = {
    //   method: 'POST',
    //   headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.3.0'},
    //   body: '{"vmsIds":["MedicalSolutions","Kruse","Medefis5","WorkforceSG","StafferLink"]}'
    // };
>>>>>>> bdde834e05800c9e70178d0921f3dc3556254c39

    // fetch('http://192.168.1.99:9291/api/allvms/getAllOpenByVMSIdFlux', options)
    //   .then(response => response.json())
    //   .then(response => console.log(response))
    //   .catch(err => console.error(err));

    fetch(`${jobshost}allvms/getAllOpenByVMSIdFlux`, options)
      .then((response) => response.json())

<<<<<<< HEAD
    .then((response) => {
      setIsloading(false); //console.log(response)
=======
      .then((response) => {
        setIsloading(false);
>>>>>>> bdde834e05800c9e70178d0921f3dc3556254c39

        setAllJobs(Object.keys(response).map((item, index) => response[item]));
      })
      .catch((err) => console.error(err));
  }

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
