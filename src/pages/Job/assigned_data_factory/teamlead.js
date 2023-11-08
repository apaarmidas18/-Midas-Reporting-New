import React from "react";
import { host } from "../../../static";

export const teamlead = (setManager, setLoading) => {
  const user = JSON.parse(localStorage.getItem("User"));
  var requestOptions = {
    method: "POST",
    redirect: "follow",
    body: "{}",
  };

  fetch(`${host}auth/users/all-users?rollId=5`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result) {
        return setManager(result.payload), setLoading(false);
      }
    })
    .catch((error) => console.log("error", error));
};
