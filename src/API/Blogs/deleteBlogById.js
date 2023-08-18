import React from "react";
import { host } from "../../static";
import swal from "sweetalert";

const deleteBlogById = ({ blogID }) => {
  const loginData = localStorage.getItem("User");
  const token = JSON.parse(loginData);

  const options = {
    method: "PUT",
    headers: { "x-access-token": token.accessToken },
  };

  fetch(`${host}seo/blog/removeBlog/${blogID}`, options)
    .then((response) => response.json())
    .then((response) => {
      if (response.baseResponse.status == 1) {
        window.location.reload();
        swal({
          title: "Success.",
          text: response.baseResponse.message,
          icon: "success",
        });
      } else {
        swal({
          title: "Fetch Error.",
          text: response.baseResponse.message,
          icon: "error",
        });
      }
    })
    .catch((err) => console.error(err));
};

export default deleteBlogById;
