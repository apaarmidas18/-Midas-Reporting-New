import React from "react";
import { host } from "../../../static";

const GetFacilityByCId = (id, setFacilityData) => {

  const cId = id;
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    `${host}auth/project/get-facilities-client?clientId=${cId}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      setFacilityData(result);
    })
    .catch((error) => console.log("error", ));
};

export default GetFacilityByCId;
