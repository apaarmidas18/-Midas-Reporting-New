import { host } from "../../static";

const GetTimeSheetByPId = ({ setViewTimeSheetTable, PId, setLoading }) => {
  const user = localStorage.getItem("User");
  const UserData = JSON.parse(user);
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    `${host}auth/time-sheet/get-records/${PId}?userName=${UserData.name}&userId=${UserData.id}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      if (result) {
        return setViewTimeSheetTable(result), setLoading(false);
      }
    })
    .catch((error) => console.log("error", error));
};

export default GetTimeSheetByPId;
