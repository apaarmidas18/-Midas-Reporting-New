import { jobshost } from "../../../static";
import axios from "axios";

const getAllVmsConfig = async (setVMS, setVMsDetails) => {
  const user = localStorage.getItem("User");
  const parsedData = JSON.parse(user);
  const options = {
    method: "GET",
    url: `${jobshost}jobAssignment/getAllVmsConfig`,
  };

  const apiFetch = await axios.request(options);

  const response = await apiFetch.data;
  setVMsDetails(response);
  var resp = response.filter(
    (item, index) => item.accountManager === parsedData.id
  );
  setVMS(resp);
};

export default getAllVmsConfig;
