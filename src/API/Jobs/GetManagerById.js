import React from "react";
import { host } from "../../static";

const GetManagerById = (
  setManager,
  setLoading,
  id,
  setRecruiterData,
  setTeamlData
) => {
  const user = JSON.parse(localStorage.getItem("User"));
  var requestOptions = {
    method: "POST",
    redirect: "follow",
    body: "{}",
  };

  fetch(`${host}auth/users/all-users?rollId=${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result) {
        return (
          setManager(result.payload),
          setRecruiterData(result.payload),
          setTeamlData(result.payload),
          setLoading(false)
        );
      }
    })
    .catch((error) => console.log("error"));
};

export default GetManagerById;
