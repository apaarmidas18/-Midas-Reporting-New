import React from "react";

const Select = (props) => {
  const { selectChange, array, selectName, selectBlur, selectStyle, required } =
    props;
  console.log(array);
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
            <option value={item.label ?  JSON.stringify(item.label) : JSON.stringify(item)}>
              {item.label ? item.label : item.name}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default Select;
