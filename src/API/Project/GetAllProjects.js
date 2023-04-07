import axios from "axios";
import React from "react";
import { host } from "../../static";

const GetAllProjects = ({ setProjectDetails, setLoading }) => {
  const user = localStorage.getItem("User");
  const UserData = JSON.parse(user);
  var config = {
    method: "get",
    url: `${host}auth/project/get-all?page=0&userId=${UserData.id}`,
    headers: {},
  };

  axios(config)
    .then(function(response) {
      if (response) {
        setProjectDetails(response.data.items);
        setLoading(false);
      }
    })
    .catch(function(error) {
      console.log(error);
    });
};

export default GetAllProjects;
