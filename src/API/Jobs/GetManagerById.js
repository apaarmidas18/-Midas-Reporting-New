import React from "react";
import { host } from "../../static";

const GetManagerById = ({ setManager, setLoading }) => {
  var requestOptions = {
    method: "POST",
    redirect: "follow",
    body: "{}",
  };

  fetch(`${host}auth/users/all-users?rollId=7`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
  
      if (result) {
        return setManager(result.payload), setLoading(false);
      }
    })
    .catch((error) => console.log("error", error));
};

export default GetManagerById;
