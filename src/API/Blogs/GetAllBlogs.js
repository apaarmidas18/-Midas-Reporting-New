import React from "react";
import { host } from "../../static";

const GetAllBlogs = ({ setAllblogs, setIsloading }) => {
  const loginData = localStorage.getItem("User");
  const token = JSON.parse(loginData);
  const options = {
    method: "GET",
    headers: {
      "x-access-token": token.accessToken,
    },
  };

  fetch(`${host}seo/blog/getAllBlogs`, options)
    .then((response) => response.json())
    .then((response) => {
      if (response.baseResponse.status == 1) {
        setAllblogs(response.response);
        setIsloading(false);
      } else {
        setIsloading(true);
      }
    })
    .catch((err) => console.error(err));
};

export default GetAllBlogs;
