import { host } from "../../static";

const CreateTimeSheet = (values) => {
  const user = localStorage.getItem("User");
  const userData = JSON.parse(user);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    projectId: values.projectId,
    projectDbId: values.projectDbId,
    employeeId: values.employeeId,
    date: values.date,
    day: values.day,
    regularHours: parseInt(values.regularHours),
    breakHours: parseInt(values.breakHours),
    overTimeHours: parseInt(values.overTimeHours),
    holidayHours: parseInt(values.holidayHours),
  });
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    `${host}auth/time-sheet/create-new?userName=${userData.name}&userId=${userData.id}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => console.log("result.message"))
    .catch((error) => console.log("error", error));
};

export default CreateTimeSheet;
