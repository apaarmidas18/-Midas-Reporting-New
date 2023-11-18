import { host } from "../../../static";

const GetAllFacility = ({ setFacilityData, setLoading }) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(`${host}auth/project/get-facilities`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result) {
        return setFacilityData(result), setLoading(false);
      }
    })
    .catch((error) => console.log("error",));
};

export default GetAllFacility;
