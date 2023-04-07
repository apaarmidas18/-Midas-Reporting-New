import axios from "axios";

import swal from "sweetalert";
import { host } from "../../static";

const EditTimesheet = (tId, values, navigate) => {
  const userData = localStorage.getItem("User");
  const user = JSON.parse(userData);
  const name = user.name;
  let data = JSON.stringify({
    totalHours: values.totalHours,
    breakHours: values.breakHours,
    overTimeHours: values.overTimeHours,
    holidayHours: values.holidayHours,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${host}auth/time-sheet/edit-record/${tId}?userName=${name}&userId=${user.id}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      if (response.data.status === 200) {
        swal({
          title: "Timesheet Updated Successfully.",
          title: response.data.message,
          icon: "success",
        });
        navigate("/dashboard/view-timesheet");
      } else {
        swal({
          title: "Submission Error.",
          title: response.data.message,
          icon: "error",
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export default EditTimesheet;
