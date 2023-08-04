import axios from "axios";
import { dhost } from "../../static";
<<<<<<< HEAD
const token = localStorage.getItem("token");

const GetViewDocuments = ({ setDocumentDetail, setLoading, templateid }) => {
  const options = {
    method: "GET",
    url: `${dhost}document/getAllViewDocs/${templateid}/${token}`,
=======

const GetViewDocuments = ({ setDocumentDetail, setLoading }) => {
  const options = {
    method: "GET",
    url: `${dhost}document/getAllViewDocs/40051000000266365`,
>>>>>>> 8c783257aad71ffd0b28862fc0125ad70333875a
  };

  axios
    .request(options)
<<<<<<< HEAD
    .then(function (response) {
      setDocumentDetail(response.data.response);
    })
    .catch(function (error) {
=======
    .then(function(response) {
      setDocumentDetail(response.data.response);
    })
    .catch(function(error) {
>>>>>>> 8c783257aad71ffd0b28862fc0125ad70333875a
      console.error(error);
    });
};

export default GetViewDocuments;
