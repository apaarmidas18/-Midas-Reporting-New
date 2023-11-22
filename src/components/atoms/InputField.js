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
    inpname,
    boldStyle,
    label,
    boldFor,
    style,
    max
  } = props;

  return (
    <div className={style ? style : "col-md-4"}>
      <label className={boldStyle ?  boldStyle : "label"} for={boldFor} >
        {label}
      </label>
      <input
        type={inptype}
        class="form-control"
        id={inpid}
        aria-describedby="emailHelp"
        name={inpname}
        onChange={inpchange}
        onBlur={inpblur}
        value={inpvalue}
        controlId={inpcontrol}
        disabled={disabled}
        style={inpstyle}
        max={max}
      />
    </div>
  );
};

export default InputField;
