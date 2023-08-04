import axios from "axios";
import { dhost } from "../../static";
const token = localStorage.getItem("token");

const GetViewDocuments = ({ setDocumentDetail, setLoading, templateid }) => {
  const options = {
    method: "GET",
    url: `${dhost}document/getAllViewDocs/${templateid}/${token}`,
  };

  axios
    .request(options)
    .then(function (response) {
      setDocumentDetail(response.data.response);
    })
    .catch(function (error) {
      console.error(error);
    });
};

export default GetViewDocuments;
