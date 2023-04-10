import axios from "axios";
import React from "react";
import { host } from "../../static";
import swal from "sweetalert";

const GetProjectExtensionLogs = ({ setProjectExtensionLogs, setLoading }) => {
  const user = localStorage.getItem("User");
  const UserData = JSON.parse(user);
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${host}auth/logs/extension?page=0&userId=${UserData.id}`,
  };

  axios
    .request(config)
    .then((response) => {
      if (response.data) {
        setLoading(false);
        setProjectExtensionLogs(response.data.items);
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

export default GetProjectExtensionLogs;
