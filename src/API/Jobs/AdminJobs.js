import React from "react";
import { host, jobshost } from "../../static";

const GetManagerById = (
  setManager,
  setLoading,

) => {
  var requestOptions = {
    method: "Get",
    redirect: "follow",
   
  };

  fetch(`${jobshost}allvms/getAllOpenFeeds`, requestOptions)
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
    .catch((error) => console.log("error", error));
};

export default GetManagerById;
