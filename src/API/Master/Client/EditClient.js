import { host } from "../../../static";
import swal from "sweetalert";

export const EditClientAPI = (values, router, cId) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    name: values.name,
    address: values.address,
    email: values.email,
    phone: values.phone,
    contactPersonName: values.contactPersonName,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(`${host}auth/project/edit-client?clientId=${cId}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.status) {
        router("/dashboard/view-client");
      } else {
        swal({
          title: "Submission Error.",
          title: result.message,
          icon: "error",
        });
      }
    })
    .catch((error) => console.log("error", ));
};
