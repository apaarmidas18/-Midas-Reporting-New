import axios from "axios";
import swal from "sweetalert";
import { host } from "../../static";

const CreateUser = (values, navigate) => {
  var data = {
    name: values.name,
    email: values.email,
    password: values.password,
    status: values.status,
    phone: values.number,
    rollId: values.rollId,
    type: values.type,
    managerId: values.managerId,
  };

  var config = {
    method: "post",
    url: `${host}create-user`,
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(response);
      if (response.data.status == 200) {
        navigate("/dashboard/view-user");
      } else {
        swal({
          title: "Submission Error.",
          text: response.message,
          icon: "error",
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

export default CreateUser;
