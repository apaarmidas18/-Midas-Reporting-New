import moment from "moment";
import React from "react";

import swal from "sweetalert";
import { host } from "../../static";
export const CreateEmployee = (values, navigate) => {
  const user = localStorage.getItem("User");
  const UserData = JSON.parse(user);
  var date = moment(values.dob).format("MM/DD/YYYY");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    name: values.firstName + " " + values.lastName,
    ssn: values.ssn,
    dob: date,
    address: values.address,
    companyName: values.companyName,
    companyId: values.companyId,
    email: values.email,
    city: values.city,
    state: values.state,
    zipCode: values.zipCode,
    contactDetails: values.contactDetails,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    `${host}auth/employee/create-new?userName=${UserData.name}&userId=${UserData.id}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      if (result.status === 200) {
        navigate("/dashboard/view-employee");
      } else {
        swal({
          title: "Submission Error.",
          title: result.message,
          icon: "error",
        });
      }
    })
    .catch((error) => console.log("error",));
};
