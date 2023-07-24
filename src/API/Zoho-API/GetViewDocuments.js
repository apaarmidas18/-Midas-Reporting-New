import axios from "axios";
import { dhost } from "../../static";

const GetViewDocuments = ({ setDocumentDetail, setLoading }) => {
  const options = {
    method: "GET",
    url: `${dhost}document/getAllViewDocs/40051000000266365`,
  };

  axios
    .request(options)
    .then(function(response) {
      setDocumentDetail(response.data.response);
    })
    .catch(function(error) {
      console.error(error);
    });
};

export default GetViewDocuments;
