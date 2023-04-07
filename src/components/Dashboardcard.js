import React from "react";

const Dashboardcard = ({ type, number, style }) => {
  return (
    <>
      <div className={`users-card ${style}`}>
        <span>{type}</span>
        <p>{number}</p>
      </div>
    </>
  );
};

export default Dashboardcard;
