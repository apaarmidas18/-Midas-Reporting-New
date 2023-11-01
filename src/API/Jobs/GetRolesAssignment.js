import React from "react";
import { host } from "../../static";

const GetRolesAssignment = async (setDataByRole, rollId) => {
  var requestOptions = {
    method: "POST",
    redirect: "follow",
    body: "{}",
  };

  await fetch(`${host}auth/users/all-users?rollId=${rollId}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result) {
        return setDataByRole(result.payload);
      }
    })
    .catch((error) => console.log("error", error));
};

export default GetRolesAssignment;
