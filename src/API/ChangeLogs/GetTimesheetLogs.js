import axios from "axios";
import { host } from "../../static";
import swal from "sweetalert";

const GetTimesheetLogs = ({ setTimsheetLogs, setLoading }) => {
  const user = localStorage.getItem("User");
  const UserData = JSON.parse(user);
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${host}auth/logs/time-sheet?page=0&userId=${UserData.id}`,
  };

  axios
    .request(config)
    .then((response) => {
      if (response.data) {
        setLoading(false);
        setTimsheetLogs(response.data.items);
      } else {
        swal({
          title: "Fetch Error.",
          text: response.data.message,
          icon: "error",
        });
      }
    })
    .catch((error) => {
      console.log("error");
    });
};

export default GetTimesheetLogs;
