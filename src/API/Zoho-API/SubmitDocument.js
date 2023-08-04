import moment from "moment";
import React from "react";

import swal from "sweetalert";
import { dhost } from "../../static";

const token = localStorage.getItem("token");

export const SubmitDocument = (action, rid) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    actions: action,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  fetch(`${dhost}document/submitDocument/${rid}/${token}`, requestOptions)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((error) => console.error("Error fetching PDF:", error));
};
