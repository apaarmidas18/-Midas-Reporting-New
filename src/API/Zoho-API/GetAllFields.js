import axios from "axios";
import { dhost } from "../../static";

const GetAllFields = ({ setFieldDetails, setLoading }) => {
  const options = {
    method: "GET",
    url: `${dhost}document/getAllfields`,
  };

  axios
    .request(options)
    .then(function(response) {
      setFieldDetails(response.data.response.field_types);
    })
    .catch(function(error) {
      console.error(error);
    });
};

export default GetAllFields;
