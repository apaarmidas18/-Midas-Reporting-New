import React from "react";
import axios from "axios";
import swal from "sweetalert";
import { host } from "../../static";

const Userlogin = async ({ username, password, navigate }) => {
 

  const options = {
    method: "POST",

    url: `${host}login`,

    headers: {
      "Content-Type": "application/json",
    },

    data: { username: username, password: password },
  };

  const response = await axios.request(options);

  const { jwttoken, email, rollId, id, name } = response.data;

  const user = {
    email: email,

    rollId: rollId,

    id: id,

    name: name,
  };


  if (response.data === "User Not found") {
    swal({
      title: "No User Found!!",

      text:
        "Look's Like You have Entered Wrong Credentials, Please Check And Try Again.",

      icon: "error",
    });
  } else {
    localStorage.setItem("LoginState", true);
    localStorage.setItem("User", JSON.stringify(user));
    navigate("/dashboard ");
  }
};

export default Userlogin;
