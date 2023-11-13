import React from "react";
import { jobshost } from "../../../static";

const ByUserItself = () => {
  const user = JSON.parse(JSON.stringify("User"));
  const options = {
    method: "GET",
    url: `${jobshost}jobAssignment/allAssignedToMe/${user.rollId}`,
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};

export default ByUserItself;
