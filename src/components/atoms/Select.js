import React from "react";

const Select = (props) => {
  const { selectChange, array, selectName, selectBlur, selectStyle } = props;
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
