import React from "react";
import { host } from "../../static";

const GetAllUser = (setManager, setRecruiterData, setTeamlData) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(`${host}auth/users/all-users`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result) {
        return (
          setManager(result.payload),
          setRecruiterData(result.payload),
          setTeamlData(result.payload)
        );
      }
    })
    .catch((error) => console.log("error", error));
};

export default GetAllUser;
