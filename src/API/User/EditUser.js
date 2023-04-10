import { useNavigate } from "react-router";
import { host } from "../../static";
import swal from "sweetalert";

export const EditUserAPI = (values, selectedUser, navigate) => {
  const userId = selectedUser.id;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    name: values.name,
    password: values.password,
    status: values.status,
    rollId: values.rollId,
    type: values.type,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(`${host}edit-user/${userId}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.status == 200) {
        navigate("/dashboard/view-user");
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
