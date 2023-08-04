import axios from "axios";
import { dhost } from "../../static";
<<<<<<< HEAD
const token = localStorage.getItem("token");

const GetDocumentByReqAndDocID = ({ rid, documentId, setGetDoc }) => {
  console.log("documentId:", documentId);

  fetch(
    `${dhost}document/getdoc-content/request/${rid}/documents/${documentId}/${token}`
  )
    .then((response) => response.blob())
    .then((blob) => setGetDoc(URL.createObjectURL(blob)))
    .catch((error) => console.error("Error fetching PDF:", error));
=======

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
>>>>>>> 8c783257aad71ffd0b28862fc0125ad70333875a
};

export default GetDocumentByReqAndDocID;
