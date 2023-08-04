import axios from "axios";
import { dhost } from "../../static";
const token = localStorage.getItem("token");

const GetDocumentByReqAndDocID = ({ rid, documentId, setGetDoc }) => {
  console.log("documentId:", documentId);

  fetch(
    `${dhost}document/getdoc-content/request/${rid}/documents/${documentId}/${token}`
  )
    .then((response) => response.blob())
    .then((blob) => setGetDoc(URL.createObjectURL(blob)))
    .catch((error) => console.error("Error fetching PDF:", error));
};

export default GetDocumentByReqAndDocID;
