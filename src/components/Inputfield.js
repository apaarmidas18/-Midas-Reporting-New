import React from "react";

const Inputfield = ({
  label,
  value,
  type,
  placeholder,
  onChange,
  id,
  name,
  onClick,
  disabled,
  style,
  required,
}) => {
  return (
    <div className="col-md-3">
      <label className="m-2 text-dark" style={style}>
        {label}
      </label>
      <input
        type={type}
        class="form-control"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        required={required}
        onClick={onClick}
        disabled={disabled}
        style={style}
      />
    </div>
  );
};

export default Inputfield;
