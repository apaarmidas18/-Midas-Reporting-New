import axios from "axios";
import swal from "sweetalert";
import { dhost } from "../../static";

const SendTemplate = (request, navigate, tId) => {
  var data = JSON.stringify({
    actions: request.actions,
    notes: request.notes,
  });

  var config = {
    method: "post",
    url: `${dhost}document/sendDocument/${tId}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  console.log("data:", data);
  axios(config)
    .then(function(response) {
      console.log(response);
      // if (response.data.baseResponse.status == 200) {
      //   navigate("/dashboard/view-template");
      // } else {
      //   swal({
      //     title: "Submission Error.",
      //     title: response.data.baseResponse.message,
      //     icon: "error",
      //   });
      // }
    })
    .catch(function(error) {
      console.log(error);
    });
};

export default SendTemplate;
