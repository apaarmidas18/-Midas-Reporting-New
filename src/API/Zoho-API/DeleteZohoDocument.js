import axios from "axios";
import swal from "sweetalert";
import { dhost } from "../../static";

const token = localStorage.getItem("token");
const DeleteZohoDocument = (tempID) => {
  let config = {
    method: "patch",
    url: `${dhost}document/deleteDocument/${tempID}/${token}`,
    headers: {},
  };

  axios
    .request(config)
    .then((response) => {
      if (response.data.baseResponse.status === 1) {
        swal({
          title: "Deleted Successfully",
          text: response.data.message,
          icon: "success",
        });
      } else {
        swal({
          title: "Error",
          text: response.data.baseResponse.message,
          icon: "error",
        });
      }
    })

    .catch((error) => {
      console.log("error");
    });
};

export default DeleteZohoDocument;
