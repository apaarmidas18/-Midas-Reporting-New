import React from "react";

const TabName = ({ tabname }) => {
  return (
    <>
      <div className="container-fluid">
        <div className="tab-name">
          <span>{tabname}</span>
        </div>
      </div>
    </>
  );
};

export default TabName;
