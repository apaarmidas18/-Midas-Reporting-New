import React from "react";
import { host } from "../../../static";

const GetUserByIdforVmsConfig = (setManagerName, userId) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(`${host}auth/users/getUserById?userId=${userId}`, options)
    .then((response) => response.json())
    .then((response) => setManagerName(response.payload))
    .catch((err) => console.error(err));
};

export default GetUserByIdforVmsConfig;
