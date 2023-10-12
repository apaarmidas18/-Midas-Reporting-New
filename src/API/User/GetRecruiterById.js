import axios from "axios";
import { host } from "../../static";

const GetRecruiterById = ({ setRecuiterData }) => {
  var requestOptions = {
    method: "GET",
    url: `${host}get-user-roll`,
    params: { rollId: "5" },
  };

  axios
    .request(requestOptions)
    .then(function (response) {
      setRecuiterData(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};

export default GetRecruiterById;
