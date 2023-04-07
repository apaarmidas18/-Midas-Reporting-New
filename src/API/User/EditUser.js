import { useNavigate } from "react-router";
import { PATH_DASHBOARD } from "src/routes/paths";
import { host } from "src/static";
import swal from "sweetalert";

export const EditUser = (values, data, navigate) => {
  const userId = data.id;
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
        navigate(PATH_DASHBOARD.user_internal.viewUser);
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
