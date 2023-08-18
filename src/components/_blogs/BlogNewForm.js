import React from "react";
import HeaderBreadcrumbs from "../HeaderBreadcrumbs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import CreateClient from "../../API/Master/Client/CreateClient";
import { useState } from "react";
import SITE from "../../utils/SITE";
import status from "../../utils/status";
import ReactQuill from "react-quill";
import CreateNewBlog from "../../API/Blogs/CreateNewBlog";
const BlogNewForm = () => {
  const userData = localStorage.getItem("User");
  const user = JSON.parse(userData);
  const navigate = useNavigate();
  //validation******************************************************************
  const formik = useFormik({
    initialValues: {
      siteId: "",
      title: "",
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      url: "",
      status: "",
      content: "",
    },
    validationSchema: Yup.object({
      siteId: Yup.number().required("Required"),
      title: Yup.string().required("Required"),
      metaTitle: Yup.string().required("Required"),
      metaDescription: Yup.string().required("Required"),
      metaKeywords: Yup.string().required("Required"),
      url: Yup.string().required("Required"),
      status: Yup.string().required("Required"),
      content: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      CreateNewBlog({ values, navigate });
      alert(JSON.stringify(values, null, 2));
    },
  });
  //validation**************************************************************************8
  console.log(formik.values);
  return (
    <>
      <div className="container-fluid round-border bg-white p-4 mt-4 rounded-2xl">
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div class="mb-3 col-md-6">
              <label for="siteId" class="form-label">
                Site-Id
              </label>
              <select
                class="form-select"
                aria-label="Default select example"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="siteId"
              >
                <option selected>Open this select menu</option>
                {SITE.map((item, index) => {
                  return <option value={item.id}>{item.siteName}</option>;
                })}
              </select>
              <span className="text-danger">
                {formik.touched.siteId && formik.errors.siteId ? (
                  <div className="text-danger">{formik.errors.siteId}</div>
                ) : null}
              </span>
            </div>
            <div class="mb-3 col-md-6">
              <label for="title" class="form-label">
                Blog-Title
              </label>
              <input
                type="title"
                class="form-control"
                id="title"
                aria-describedby="titleHelp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                controlId="title"
              />
              <span className="text-danger">
                {formik.touched.title && formik.errors.title ? (
                  <div className="text-danger">{formik.errors.title}</div>
                ) : null}
              </span>
            </div>
            <div class="mb-3 col-md-6">
              <label for="metaTitle" class="form-label">
                Meta-Title
              </label>
              <input
                type="text"
                class="form-control"
                id="metaTitle"
                aria-describedby="emailHelp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.metaTitle}
                controlId="metaTitle"
              />
              <span className="text-danger">
                {formik.touched.metaTitle && formik.errors.metaTitle ? (
                  <div className="text-danger">{formik.errors.metaTitle}</div>
                ) : null}
              </span>
            </div>
            <div class="mb-3 col-md-6">
              <label for="metaDescription" class="form-label">
                Meta-Description
              </label>
              <input
                type="text"
                class="form-control"
                id="metaDescription"
                aria-describedby="emailHelp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.metaDescription}
                controlId="metaDescription"
              />
              <span className="text-danger">
                {formik.touched.metaDescription &&
                formik.errors.metaDescription ? (
                  <div className="text-danger">
                    {formik.errors.metaDescription}
                  </div>
                ) : null}
              </span>
            </div>
            <div class="mb-3 col-md-6">
              <label for="name" class="form-label">
                Meta-Keywords
              </label>
              <input
                type="text"
                class="form-control"
                id="metaKeywords"
                aria-describedby="emailHelp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.metaKeywords}
                controlId="metaKeywords"
              />
              <span className="text-danger">
                {formik.touched.metaKeywords && formik.errors.metaKeywords ? (
                  <div className="text-danger">
                    {formik.errors.metaKeywords}
                  </div>
                ) : null}
              </span>
            </div>
            <div class="mb-3 col-md-6">
              <label for="name" class="form-label">
                Blog-URL
              </label>
              <input
                type="text"
                class="form-control"
                id="url"
                aria-describedby="emailHelp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.url}
                controlId="url"
              />
              <span className="text-danger">
                {formik.touched.url && formik.errors.url ? (
                  <p className="text-danger">{formik.errors.url}</p>
                ) : null}
              </span>
            </div>
            <div class="mb-3 col-md-6">
              <label for="name" class="form-label">
                Blog-Status
              </label>
              <select
                class="form-select"
                aria-label="Default select example"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="status"
              >
                <option selected>Open this select menu</option>
                {status.map((item, index) => {
                  return <option value={item.id}>{item.status}</option>;
                })}
              </select>
              <span className="text-danger">
                {formik.touched.status && formik.errors.status ? (
                  <div className="text-danger">{formik.errors.status}</div>
                ) : null}
              </span>
            </div>
            <div class="col-md-6 d-flex align-items-center justify-content-center">
              <button
                type="submit"
                class="btn btn-primary w-100"
                disabled={!formik.isValid}
              >
                Create Blog
              </button>
            </div>
            <ReactQuill
              theme="snow"
              value={formik.values.content}
              onChange={(e) => formik.setFieldValue("content", e)}
              onBlur={formik.handleBlur}
              name="content"
            />
            <span className="text-danger">
              {formik.touched.content && formik.errors.content ? (
                <p className="text-danger">{formik.errors.content}</p>
              ) : null}
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default BlogNewForm;
