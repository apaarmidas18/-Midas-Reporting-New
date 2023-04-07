import React from "react";
import { host } from "../../../static";
import swal from "sweetalert";

export const EditVMSAPI = (values, vmsId, router) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    name: values.name,
    url: values.url,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(`${host}auth/project/edit-vms?vmsId=${vmsId}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.status) {
        router("/dashboard/view-vms");
      } else {
        swal({
          title: "Submission Error.",
          title: result.message,
          icon: "error",
        });
      }
    })
    .catch((error) => console.log("error", error));
};
