import { host } from "../../static";

const GetAllManagers = ({ setManagerData, setLoading }) => {
  const loginData = localStorage.getItem("User");
  const token = JSON.parse(loginData);

  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: {
      "x-access-token": token.accessToken,
    },
  };

  fetch(`${host}auth/getAllManagers`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.baseResponse.status == 1) {
        setManagerData(result.response);
        setLoading(false);
      } else {
        setLoading(true);
      }
    })
    .catch((error) => console.log("error", error));
};

export default GetAllManagers;
