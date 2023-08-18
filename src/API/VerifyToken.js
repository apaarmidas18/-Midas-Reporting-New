import { host } from "../static";

const Verifytoken = ({ navigate }) => {
  const user = localStorage.getItem("User");
  const UserData = JSON.parse(user);
  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: {
      "x-access-token": UserData.accessToken,
    },
  };
  fetch(`${host}auth/token/verify`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.baseResponse.status == 0) {
        navigate("/dashboard");
        localStorage.clear();
      }
    })
    .catch((error) => console.log("error", error));
};
export default Verifytoken;
