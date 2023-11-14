import { host, jobshost } from "../../static";
import axios from "axios";
import swal from "sweetalert";

const AssignJobs = (assigned) => {
  const options = {
    method: "POST",
    url: `${jobshost}jobAssignment/assignJob`,
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "insomnia/2023.5.8",
    },
    data: assigned,
  };
  axios
    .request(options)
    .then(function (response) {
      if (response.status == 201) {
        window.location.reload();
        swal({
          title: "Job Assigned Successfully",
          text: `${response.data.status} Job(s) have been successfully assigned`,
          icon: "success",
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

export default AssignJobs;
