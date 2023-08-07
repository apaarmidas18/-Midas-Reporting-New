import React from "react";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import BlogNewForm from "../../components/_blogs/BlogNewForm";

const AddBlogs = () => {
  return (
    <div>
      <HeaderBreadcrumbs
        heading={"Add Blogs"}
        meta={"Blogs"}
        main={"Add Blogs"}
      />
      <BlogNewForm />
    </div>
  );
};

export default AddBlogs;
