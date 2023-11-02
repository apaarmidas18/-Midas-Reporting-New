import { host, jobshost } from "../../static";
import axios from "axios";
import swal from "sweetalert";

const AssignJobs = (assigned) => {
  // const options = {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   // url: `http://192.168.1.172:9291/api/jobAssignment/assignJob`,
  //   url: `${jobshost}jobAssignment/assignJob`,
  //   body: assigned,
  // };
  const options = {
    method: "POST",
    url: `${jobshost}jobAssignment/assignJob`,
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "insomnia/2023.5.8",
    },
    data: JSON.stringify(assigned),
  };
  console.log(options);
  axios
    .request(options)
    .then(function (response) {
      if (response.status == 201) {
        swal({
          title: "Job Assigned Successfully",
          text: `${response.data.status} Job(s) have been successfully assigned`,
          icon: "success",
        });
      }
    })
    .catch(function (error) {
      console.log("errorL", error.response.data);
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

export default AssignJobs;
