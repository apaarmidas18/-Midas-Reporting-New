import React from "react";
import { host } from "../../static";

const GetRolesAssignment = (setDataByRole, rollId) => {
  //   var requestOptions = {
  //     method: "POST",
  //     redirect: "follow",
  //   };

  //   fetch(`${host}auth/users/all-users?rollId=${rollId}`, requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       if (result) {
  //         return setDataByRole(result);
  //       }
  //     })
  //     .catch((error) => console.log("error", error));
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "insomnia/2023.5.8",
    },
    body: "{}",
  };

  fetch("http://192.168.1.172:8090/auth/users/all-users?rollId=1", options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};

export default GetRolesAssignment;
