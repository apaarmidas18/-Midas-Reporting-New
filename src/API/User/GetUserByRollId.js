import { host } from "../../static";

const GetUserByRollId = ({ setOnBoardingData }) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(`${host}get-user-roll?rollId=4`, requestOptions)
    .then((response) => response.json())
    .then((result) => setOnBoardingData(result))
    .catch((error) => console.log("error", error));
};

export default GetUserByRollId;
