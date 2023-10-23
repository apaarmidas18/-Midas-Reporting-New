import React from "react";

const Label = (props) => {
  const { labelFor, labelStyle, labelName } = props;

  return (
    <>
      <label className="form-label" for={labelFor} style={labelStyle}>
        {labelName}
      </label>
    </>
  );
};

export default Label;
