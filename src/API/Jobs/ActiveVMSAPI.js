import React from "react";
import swal from "sweetalert";
import { host } from "../../static";

const ActiveVMSAPI = (values) => {
  const user = localStorage.getItem("User");
  const userData = JSON.parse(user);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    vmsName: values.name,
    vmsurl: values.url,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(`${host}jobs/add-current-vms`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      // if (result.status === 200) {
      //   router("/dashboard/view-vms");
      // } else {
      //   swal({
      //     title: "Submission Error.",
      //     text: result.message,
      //     icon: "error",
      //   });
      // }
      alert(JSON.stringify(result));
    })
    .catch((error) => console.log("error", error));
};

export default ActiveVMSAPI;
