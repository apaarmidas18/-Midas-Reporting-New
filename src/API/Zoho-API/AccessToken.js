import axios from "axios";
import { dhost } from "../../static";

const AccessToken = async () => {
  const options = {
    method: "GET",
    redirect: "follow",
  };
  fetch(`${dhost}document/generateToken`, options)
    .then((response) => response.json())
    .then(async (result) => {
      console.log(result.response);
      const access_token = await result.response.access_token;
      await localStorage.setItem("token", access_token);
    })
    .catch((error) => console.log(error));
};

export default AccessToken;
