import React from "react";
import { host } from "../../static";

const GetRolesAssignment = async (
  setDataByRole,
  rollId,
  name,
  setDataforRecruiter
) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  await fetch(`${host}auth/users/getUsersByManager/${rollId}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result) {
        if (name == "teamLead") {
          return setDataByRole(result.payload);
        } else if (name == "recruiter") {
          return setDataforRecruiter(result.payload);
        }
      }
    })
    .catch((error) => console.log("error"));
};

export default GetRolesAssignment;
