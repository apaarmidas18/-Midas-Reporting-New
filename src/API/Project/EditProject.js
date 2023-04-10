import axios from "axios";
import swal from "sweetalert";
import { host } from "../../static";

const EditProjectAPI = (values, navigate, data) => {
  const user = localStorage.getItem("User");
  const UserData = JSON.parse(user);
  const name = UserData.name.replace(" ", "");
  const id = data.id;

  var data = JSON.stringify({
    facility: values.facilityName,
    organisation: values.organisation,
    designation: values.designation,
    startDate: values.startDate,
    recruter: values.recruiter,
    teamLeader: values.teamLeader,
    employeDBId: values.employeeCode,
    employeId: values.employeeId,
    occupationType: values.occupationType,
    billRates: parseInt(values.billRates),
    payRates: parseInt(values.payRates),
    preDeim: parseInt(values.preDeim),
    overTimeRates: parseInt(values.overTimeRates),
    guaranteeHours: values.guaranteeHours,
    client: values.clientName,
    vms: values.vms,
    endDate: values.endDate,
    travelAllowance: values.travelAllowance,
    editRemarks: values.editRemarks,
    userName: values.userName,
    userId: values.userId,
    status: values.projectStatus,
  });

  var config = {
    method: "post",
    url: `${host}auth/project/edit/${id}?userName=${name}&userId=${UserData.id}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  console.log("dataLL", data);

  axios(config)
    .then(function(response) {
      if (response.data.status == 200) {
        navigate("/dashboard/view-project");
      } else {
        swal({
          title: "Submission Error.",
          title: response.message,
          icon: "error",
        });
      }
    })
    .catch(function(error) {
      console.log(error);
    });
};

export default EditProjectAPI;
