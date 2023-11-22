import axios from "axios";
import swal from "sweetalert";
import { jobshost } from "../../../static";
import GetAllAssignedVMS from "./GetAllAssignedVMS";

const AssignedVMS = (values, vmsName, setAssignedVMS, setLoading) => {
  vmsName.map(async (item, index) => {
    var config = {
      method: "post",
      url: `${jobshost}jobAssignment/assignVMS`,
      data: {
        vmsName: item,
        accountManager: values.accountManager,
      },
    };

    await axios(config)
      .then(function (response) {
        if (response.status == 201) {
          swal({
            title: "Assigned Successfully",
            text: response.message,
            icon: "success",
          }).then(() => {
            GetAllAssignedVMS(setAssignedVMS, setLoading);
          });
        } else if (response.data.errorCode == 100) {
          swal({
            title: "Submission Error",
            text: response.message,
            icon: "error",
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
        console.log("error");
      });
  });
};

export default AssignedVMS;
