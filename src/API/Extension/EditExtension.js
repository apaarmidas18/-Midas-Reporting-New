import axios from "axios";
import moment from "moment";
import swal from "sweetalert";
import { host } from "../../static";

export const EditExtensionAPI = (values, navigate, PId) => {
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
    guaranteeHours: values.guaranteeHours,
    travelAllowance: values.travelAllowance,
    billRates: values.billRates,
    userName: UserData.name,
    userId: UserData.id,
    remarks: values.editRemarks,
    startDate: start,
  };
  var config = {
    method: "post",
    url: `${host}auth/project/edit-extension?id=${PId}`,
    data: data,
  };
  axios(config)
    .then(function(response) {
      if (response.data.status == 200) {
        swal({
          title: "Edited Successfully.",
          text: response.data.message,
          icon: "success",
        });
        navigate("/dashboard/view-employee");
      } else {
        swal({
          title: "Submission Error.",
          text: response.data.message,
          icon: "error",
        });
      }
    })
    .catch(function(error) {
      console.log("error");
    });
};
