import axios from "axios";
import swal from "sweetalert";
import { host } from "../../static";

const AssignJobs = (values, handleClose1) => {
  var jobId = values.assignedJobs.map((item) => item.ProviderJobID);
  var data = {
    recruiterName: values.recruiterName,
    recruiterId: values.recruiterId,
    assignedJobs: JSON.stringify(jobId),
  };
  var config = {
    method: "post",
    url: `${host}jobs/create-new`,
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(response);
      if (response.data.status == 200) {
        swal({
          title: "Job Assigned Successfully.",
          text: response.message,
          icon: "success",
        });
        handleClose1();
      } else {
        swal({
          title: "Submission Error.",
          text: response.message,
          icon: "error",
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

export default AssignJobs;
