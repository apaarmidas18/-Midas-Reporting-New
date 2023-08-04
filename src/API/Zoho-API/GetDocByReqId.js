import axios from "axios";
import { dhost } from "../../static";
const token = localStorage.getItem("token");

const GetDocByReqId = ({ setDataByRequestId, setLoading, requestid }) => {
  const options = {
    method: "GET",
    url: `${dhost}document/getDocumentByReqId/${requestid}/${token}`,
  };
  setLoading(true);
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      setLoading(false);
      setDataByRequestId(response.data.response);
    })
    .catch(function (error) {
      console.error(error);
    });
};

export default GetDocByReqId;
