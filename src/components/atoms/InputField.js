import React from "react";

const InputField = (props) => {
  const {
    inptype,
    inpid,
    inpchange,
    inpblur,
    inpvalue,
    inpcontrol,
    disabled,
    inpstyle,
  } = props;

  return (
    <>
      <input
        type={inptype}
        class="form-control"
        id={inpid}
        aria-describedby="emailHelp"
        onChange={inpchange}
        onBlur={inpblur}
        value={inpvalue}
        controlId={inpcontrol}
        disabled={disabled}
        style={inpstyle}
      />
    </>
  );
};

export default InputField;
