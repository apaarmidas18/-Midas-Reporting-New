import axios from "axios";
import { dhost } from "../../static";

const GetDocumentByReqAndDocID = ({ rid, docId, setGetDoc }) => {
  const options = {
    method: "GET",
    url: `${dhost}document/getdoc-content/request/${rid}/documents/${docId}`,
  };
  console.log(options.url);
  axios
    .request(options)
    .then(function(response) {
      setGetDoc(response.data);
    })
    .catch(function(error) {
      console.error(error);
    });
};

export default GetDocumentByReqAndDocID;
