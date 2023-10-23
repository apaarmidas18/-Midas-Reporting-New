import { host } from "../../static";

const GetAllEmployee = ({ setEmployeeDetails, setLoading }) => {
  const user = localStorage.getItem("User");
  const UserData = JSON.parse(user);
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  try {
    fetch(
      `${host}auth/employee/get-all?page=0&userId=${UserData.id}`,
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        console.log(result);
        if (result) {
          setEmployeeDetails(result.items);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle the error or log it as needed
      });
  } catch (error) {
    console.error("Try-Catch Error:", error);
    // Handle the error or log it as needed
  }
};
export default GetAllEmployee;
