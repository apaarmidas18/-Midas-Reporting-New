import React from "react";

const Select = (props) => {
  const { selectChange, array, selectName, selectBlur, selectStyle, required } =
    props;
  return (
    <>
      <select
        class="form-select"
        aria-label="Default select example"
        onChange={selectChange}
        onBlur={selectBlur}
        name={selectName}
        style={selectStyle}
        required={required}
      >
        <option selected>Open this select menu</option>
        {array.map((item, index) => {
          return (
            <option value={JSON.stringify(item)}>
              {item.label ? item.label : item.name}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default Select;
