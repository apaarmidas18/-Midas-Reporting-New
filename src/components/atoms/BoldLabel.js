import React from "react";

const BoldLabel = (props) => {
  const { boldFor, boldStyle, boldName } = props;

  return (
    <>
      <label className="job-robotix-label" for={boldFor} style={boldStyle}>
        {boldName}
      </label>
    </>
  );
};

export default BoldLabel;
