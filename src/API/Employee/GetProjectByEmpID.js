import axios from "axios";
import { host } from "../../static";

const GetProjectByEmpId = ({ setProjectDetails, emp_id, setLoading }) => {
  const user = localStorage.getItem("User");
  const UserData = JSON.parse(user);

  var config = {
    method: "get",
    url: `${host}auth/project/get-project/${emp_id}?userId=${UserData.id}`,
    headers: {},
  };
  axios(config)
    .then(function(response) {
      if (response) {
        return setProjectDetails(response.data), setLoading(false);
      }
    })
    .catch(function(error) {
      console.log(error);
    });
};

export default GetProjectByEmpId;
