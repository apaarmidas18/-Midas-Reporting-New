import { host } from "../../../static";

const GetAllClients = ({ setClientDetails, setLoading }) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(`${host}auth/project/get-clients`, requestOptions)
    .then((response) => response.json())

    .then((result) => {
      if (result) {
        return setClientDetails(result), setLoading(false);
      }
    })
    .catch((error) => console.log("error", ));
};

export default GetAllClients;
