import React from "react";
import { jobshost } from "../../static";
import axios from "axios";
import swal from "sweetalert";
import ByManager from "../../pages/Job/AssignedAPI/ByManager";

const UnassignJob = (jobsdata, setAssignedbyManager, setIsloading) => {
  const user = JSON.parse(localStorage.getItem("User"));

  const options = {
    method: "POST",
    url: `${jobshost}jobAssignment/unAssignManager`,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      managerId: user.id,
      recruiterId:
        user.rollId === 7 ? jobsdata.tlId : jobsdata.finalUserAssignee,
      jobProviderIds: [jobsdata.ProviderJobID],
    },
  };

  axios
    .request(options)
    .then(function (response) {
      if (response.data.status == "OK") {
        swal({
          title: "Job Un-assigned Successfully",
          text: `${response.data.status} Job(s) have been successfully un-assigned`,
          icon: "success",
        }).then(() => {
          // alert("Ok button clicked") 
          ByManager(setAssignedbyManager, setIsloading);
        });
      }
    })
    .catch(function (error) {
      if (
        error.response.status == 500 ||
        error.response.status == 400 ||
        error.response.status == 404 ||
        error.response.status == 403 ||
        error.response.status == 415
      ) {
        swal({
          title: "Error",
          text: error.response.data.message,
          icon: "error",
        });
      }
    });
};

export default UnassignJob;
