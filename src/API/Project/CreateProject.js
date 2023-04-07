import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router";

import swal from "sweetalert";
import { host } from "../../static";

const CreateProject = (values, navigate) => {
  const user = localStorage.getItem("User");
  const UserData = JSON.parse(user);
  const StartDate = moment(values.startDate).format("MM/DD/YYYY");
  const EndDate = moment(values.endDate).format("MM/DD/YYYY");
  const name = UserData.name;

  var data = JSON.stringify({
    facility: values.facilityName,
    organisation: values.organisation,
    designation: values.designation,
    startDate: StartDate,
    endDate: EndDate,
    recruter: values.recruiter,
    teamLeader: values.teamLeader,
    employeDBId: values.employeeCode,
    employeId: values.employeId,
    billRates: parseInt(values.billRates),
    payRates: parseInt(values.payRates),
    occupationType: values.occupationType,
    preDeim: parseInt(values.perDeim),
    overTimeRates: parseInt(values.overTimeRates),
    guaranteeHours: values.guaranteeHours,
    client: values.clientName,
    vms: values.vms,
    travelAllowance: values.travelAllowance,
    status: values.projectStatus,
  });

  var config = {
    method: "post",
    url: `${host}auth/project/create-new?userName=${name}&userId=${UserData.id}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function(response) {
      if (response.data.status == 200) {
        navigate("/dashboard/view-project");
      } else {
        swal({
          title: "Submission Error.",
          title: response.data.message,
          icon: "error",
        });
      }
    })
    .catch(function(error) {
      console.log(error);
    });
};

export default CreateProject;
