import React from "react";
import Lottie from "react-lottie";
import animationData from "../../lottie/signin.json";
import { useNavigate, useParams } from "react-router";

const ViewDocument = () => {
  const token = localStorage.getItem("token");
  let { templateid } = useParams();
  const navigate = useNavigate();
  function func() {
    var redirect_url = `https://sign.zoho.in/zsi/60020492410?frameorigin=https://midas-reporting-new.vercel.app&redirect_url=https://midas-reporting-new.vercel.app/dashboard/view-templates#/template/viewer/${templateid}`;

    var params = {
      access_token: token,
    }; //No I18N

    var form = document.createElement("form");
    form.setAttribute("id", "dummyform");
    form.setAttribute("method", "post");
    form.setAttribute("action", redirect_url);

    // form.setAttribute("target", "theFrame");

    //To open in new window uncomment this

    form.setAttribute("target", "_blank");

    for (var i in params) {
      if (params.hasOwnProperty(i)) {
        var input = document.createElement("input");

        input.type = "hidden";

        input.name = i;

        input.value = params[i];

        form.appendChild(input);
      }
    }

    document.body.appendChild(form);

    form.submit();

    //To open in new window uncomment this

    //var newWindow = window.open("","theFrame",params);
  }
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="container-fluid signin-container">
      <Lottie options={defaultOptions} height={300} width={300} />
      <h2>Click Here To Proceed</h2>
      <button
        className="btn btn-primary"
        onClick={() => navigate("/dashboard/view-templates")}
      >
        Back
      </button>
      <button className="btn btn-danger" onClick={() => func()}>
        Proceed
      </button>
    </div>
  );
};
export default ViewDocument;
