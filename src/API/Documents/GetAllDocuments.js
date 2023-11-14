import { dhost } from "../../static";

const GetAllDocuments = ({ setAllDocuments, setLoading }) => {
  const token = localStorage.getItem("token");

  
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(`${dhost}document/getAllDocuments/${token}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result) {
        setLoading(false);
        setAllDocuments(result.response);
      }
    })
    .catch((error) => console.log("error", error));
};

export default GetAllDocuments;
