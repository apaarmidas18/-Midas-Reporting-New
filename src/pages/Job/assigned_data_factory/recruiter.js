import React from "react";
import { host } from "../../../static";

const recruiter = (setRecruiterData, setLoading) => {
  const user = JSON.parse(localStorage.getItem("User"));
  var requestOptions = {
    method: "POST",
    redirect: "follow",
    body: "{}",
  };

  fetch(`${host}auth/users/all-users?rollId=6`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result) {
        return setRecruiterData(result.payload), setLoading(false);
      }
    })
    .catch((error) => console.log("error", error));
};

export default recruiter;
