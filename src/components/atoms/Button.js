import React from "react";

const Button = (props) => {
  const { btnTitle, btnlogo, btntype, btnclass, btnOnClick, btnPdf } = props;

  return (
    <>
      <button type={btntype} className={btnclass} onClick={btnOnClick}>
        {btnlogo}
        {btnTitle}
        {btnPdf}
      </button>
    </>
  );
};

export default Button;
