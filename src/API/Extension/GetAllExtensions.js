import axios from "axios";
import swal from "sweetalert";
import { host } from "../../static";

const GetAllExtensions = ({ setExtensions, setLoading, PId }) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${host}auth/project/get-all-extension?projectId=${PId}`,
    headers: {},
  };
  axios
    .request(config)
    .then((response) => {
      if (response.data) {
        setExtensions(response.data);
        setLoading(false);
      } else {
        swal({
          title: "Fetched Error.",
          text: response.data.message,
          icon: "error",
        });
      }
    })
    .catch((error) => {
      console.log("error");
    });
};

export default GetAllExtensions;
