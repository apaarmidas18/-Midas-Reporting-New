import axios from "axios";
import { dhost } from "../../static";
<<<<<<< HEAD
const token = localStorage.getItem("token");
=======
>>>>>>> 8c783257aad71ffd0b28862fc0125ad70333875a

const GetAllFields = ({ setFieldDetails, setLoading }) => {
  const options = {
    method: "GET",
<<<<<<< HEAD
    url: `${dhost}document/getAllfields/${token}`,
=======
    url: `${dhost}document/getAllfields`,
>>>>>>> 8c783257aad71ffd0b28862fc0125ad70333875a
  };

  axios
    .request(options)
<<<<<<< HEAD
    .then(function (response) {
      setFieldDetails(response.data.response.field_types);
    })
    .catch(function (error) {
=======
    .then(function(response) {
      setFieldDetails(response.data.response.field_types);
    })
    .catch(function(error) {
>>>>>>> 8c783257aad71ffd0b28862fc0125ad70333875a
      console.error(error);
    });
};

export default GetAllFields;
