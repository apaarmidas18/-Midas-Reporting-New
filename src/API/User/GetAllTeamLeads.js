import axios from "axios";
import { host } from "../../static";

const GetAllTeamLeads = ({ setTeamLead }) => {
  const options = {
    method: "GET",
    url: `${host}get-user-roll`,
    params: { rollId: "6" },
  };

  axios
    .request(options)
    .then(function (response) {
      setTeamLead(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};
export default GetAllTeamLeads;
