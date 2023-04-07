import swal from "sweetalert";
import { host } from "../../../static";

const CreateFacitlity = (values, router) => {
  const user = localStorage.getItem("User");
  const userData = JSON.parse(user);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    name: values.name,
    address: values.address,
    clientName: values.clientName,
    clientId: values.clientId,
    userName: userData.name,
    userId: userData.id,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(`${host}auth/project/create-new-facility`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.status) {
        router("/dashboard/view-facility");
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

export default CreateFacitlity;
