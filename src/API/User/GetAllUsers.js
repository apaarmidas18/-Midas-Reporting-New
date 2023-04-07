import { host } from "../../static";

const GetAllUsers = ({ setUserData, setLoading }) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(`${host}get-all-user`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result) {
        setUserData(result);
        setLoading(false);
      }
    })
    .catch((error) => console.log("error", error));
};

export default GetAllUsers;
