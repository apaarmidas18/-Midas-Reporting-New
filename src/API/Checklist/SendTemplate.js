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
  axios(config)
    .then(function(response) {
      if (response.data.baseResponse.status == "success") {
        window.location.href = `https://sign.zoho.in/zs/60020492410#/request/viewer/${response.data.response.request_id}`;
      } else {
        swal({
          title: "Submission Error.",
          title: response.data.baseResponse.message,
          icon: "error",
        });
      }
    })
    .catch(function(error) {
      console.log(error);
    });
};

export default SendTemplate;
