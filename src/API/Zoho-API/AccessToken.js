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
      const access_token = await result.response.access_token;
      // await localStorage.setItem("token", access_token);
      try {
        const token = await localStorage.setItem("token", access_token);
        if (!token) {
          return null;
        }
      } catch (error) {
        return null;
      }
    })
    .catch((error) => console.log(error));
};

export default AccessToken;
