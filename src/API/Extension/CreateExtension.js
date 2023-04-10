import axios from "axios";
import moment from "moment";
import { host } from "../../static";
import swal from "sweetalert";

const CreateExtension = (values) => {
  const user = localStorage.getItem("User");
  const UserData = JSON.parse(user);
  const start = moment(values.startDate).format("MM/DD/YYYY");
  const end = moment(values.endDate).format("MM/DD/YYYY");
  var data = {
    projectDbId: values.projectCode,
    projectId: values.projectId,
    employeeId: values.employeeId,
    endDate: end,
    designation: values.designation,
    overTimeRates: values.overTimeRates,
    guaranteeHours: values.guaranteedHours,
    travelAllowance: values.travelAllowance,
    billRates: values.billRates,
    userName: UserData.name,
    userId: UserData.id,
    // remarks: values.remarks,
    startDate: start,
  };

  var config = {
    method: "post",
    url: `${host}auth/project/create-extension`,
    data: data,
  };
  axios(config)
    .then(function(response) {
      if (response.data.status == 200) {
        swal({
          title: "Created Successfully.",
          text: response.data.message,
          icon: "success",
        });
        window.location.reload();
      } else {
        swal({
          title: "Submission Error.",
          text: response.data.message,
          icon: "error",
        });
      }
    })
    .catch(function(error) {
      console.log(error);
    });
};

export default CreateExtension;
