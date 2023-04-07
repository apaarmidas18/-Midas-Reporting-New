import { host } from "../../static";

const GetAllEmployee = ({ setEmployeeDetails, setLoading }) => {
  const user = localStorage.getItem("User");
  const UserData = JSON.parse(user);
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  fetch(
    `${host}auth/employee/get-all?page=0&userId=${UserData.id}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      if (result) {
        setEmployeeDetails(result.items);
        setLoading(false);
      }
    })
    .catch((error) => console.log("error", error));
};
export default GetAllEmployee;
