import axios from "axios";
import { host } from "../../static";
import swal from "sweetalert";

const DeleteDocument = (data) => {
  let config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: `${host}auth/employee/delete-documents?fileName=${data.documentFileName}&id=${data.id}`,
    headers: {},
  };
  axios
    .request(config)
    .then((response) => {
      swal({
        title: "Are you sure?",
        text: "Are you sure that you want to delete this document?",
        icon: "warning",
        dangerMode: true,
      }).then((willDelete) => {
        if (response.data.status === 200) {
          if (willDelete) {
            swal({
              title: "Deleted Successfully",
              text: response.data.message,
              icon: "success",
            });
            window.location.reload();
          }
        } else {
          swal({
            title: "Error",
            text: response.data.message,
            icon: "error",
          });
        }
      });
    })
    .catch((error) => {
      console.log("error");
    });
};

export default DeleteDocument;
