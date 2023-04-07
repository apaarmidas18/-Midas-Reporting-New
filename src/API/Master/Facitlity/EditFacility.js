import { host } from "../../../static";
import swal from "sweetalert";

export const EditFacilityAPI = (SelectedClient, navigate, FacitlityId) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    name: SelectedClient.name,
    address: SelectedClient.address,
    clientName: SelectedClient.clientName,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    `${host}auth/project/edit-new-facility?facilityId=${FacitlityId}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      if (result.status === 200) {
        navigate("/dashboard/view-facility");
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
