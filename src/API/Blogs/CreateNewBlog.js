import React from "react";
import { host } from "../../static";
import swal from "sweetalert";

const CreateNewBlog = ({ values, navigate }) => {
  const loginData = localStorage.getItem("User");
  const token = JSON.parse(loginData);

  const raw = JSON.stringify({
    siteId: values.siteId,
    title: values.title,
    metaTitle: values.metaTitle,
    metaDescription: values.metaDescription,
    metaKeywords: values.metaKeywords,
    url: values.url,
    status: values.status,
    content: values.content,
  });

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token.accessToken,
    },
    body: raw,
  };

  fetch(`${host}seo/blog/createNewBlog`, options)
    .then((response) => response.json())
    .then((response) => {

      if (response.baseResponse.status === 1) {
        swal({
          title: "Success.",
          text: response.baseResponse.message,
          icon: "success",
        });
        navigate("/dashboard/view-blogs");
      } else {
        swal({
          title: "error.",
          text: response.baseResponse.message,
          icon: "error",
        });
      }
    })
    .catch((err) => console.error(err));
};

export default CreateNewBlog;
