import axios from "axios";
import { dhost } from "../../static";

const AccessToken = () => {
  const options = {
    method: "GET",
    redirect: "follow",
  };
  fetch(`${dhost}document/generateToken`, options)
    .then((response) => response.json())
    .then((result) => {
      console.log(result.response);
      const access_token = result.response.access_token;
      localStorage.setItem("token", access_token);
    })
    .catch((error) => console.log(error));
};

export default AccessToken;
