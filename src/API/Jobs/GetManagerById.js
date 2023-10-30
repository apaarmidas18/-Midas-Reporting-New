import React from "react";
import { host } from "../../static";

const GetManagerById = ({ setManager, setLoading }) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(`${host}get-user-roll?rollId=7`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result) {
        return setManager(result), setLoading(false);
      }
    })
    .catch((error) => console.log("error", error));
};

export default GetManagerById;