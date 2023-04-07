import React from "react";
import { Breadcrumb } from "react-bootstrap";

const HeaderBreadcrumbs = ({ meta, main, heading }) => {
  return (
    <>
      <div className="container">
        <h2 className="crumb-heading">{heading}</h2>
        <Breadcrumb>
          <Breadcrumb.Item href="/dashboard">Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item href="">{meta}</Breadcrumb.Item>
          <Breadcrumb.Item active>{main}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </>
  );
};

export default HeaderBreadcrumbs;
