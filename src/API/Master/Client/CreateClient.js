import React from "react";
import swal from "sweetalert";
import { host } from "../../../static";

const CreateClient = (values, navigate) => {
  const user = localStorage.getItem("User");
  const userData = JSON.parse(user);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    name: values.name,
    address: values.address,
    email: values.email,
    phone: values.phone,
    contactPersonName: values.contactPersonName.toUpperCase(),
    userName: userData.name,
    userId: userData.id,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(`${host}auth/project/create-new-client`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.status === 200) {
        navigate("/dashboard/view-client");
      } else {
        swal({
          title: "Submission Error.",
          text: result.message,
          icon: "error",
        });
      }
    })
    .catch((error) => console.log("error", error));
};

export default CreateClient;
