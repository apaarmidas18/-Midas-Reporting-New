import moment from "moment";

import swal from "sweetalert";
import { host } from "../../static";

export const EditEmployeeAPI = (values, navigate, EMPID) => {
  const date = moment(values.dob).format("MM/DD/YYYY");
  const user = localStorage.getItem("User");
  const UserData = JSON.parse(user);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    name: values.firstName + " " + values.lastName,
    dob: date,
    address: values.address,
    contactDetails: values.contactDetails,
    companyId: values.companyId,
    email: values.email,
    city: values.city,
    state: values.state,
    zipCode: values.zipCode,
    ssn: values.ssn,
    userName: values.userName,
    userId: values.userId,
    editRemarks: values.editRemarks,
    companyName: values.companyName,
  });
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    `${host}auth/employee/edit-employee/${EMPID}?userName=${UserData.name}&userId=${UserData.id}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      if (result.status == 200) {
        navigate("/dashboard/view-employee");
      } else {
        swal({
          title: "Submission Error.",
          title: result.message,
          icon: "error",
        });
      }
    })
    .catch((error) => console.log("error",));
};
