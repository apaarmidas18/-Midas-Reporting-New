import axios from "axios";
import swal from "sweetalert";
import { jobshost } from "../../../static";

const AssignedVMS = (values) => {
  var data = {
    vmsName: values.vmsName,
    accountManager: values.accountManager,
  };

  var config = {
    method: "post",
    url: `${jobshost}api/jobAssignment/assignVMS`,
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(response);
      if (response.status == 201) {
        swal({
          title: "Assigned Successfully",
          text: response.message,
          icon: "success",
        });
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

export default AssignedVMS;