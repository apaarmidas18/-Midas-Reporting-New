import { dhost } from "../../static";

const GetAllDocuments = ({ setAllDocuments, setLoading }) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(`${dhost}document/getAllDocuments`, requestOptions)
    .then((response) => response.json())

    .then((result) => {
      console.log("REulst", result);
      if (result) {
        setLoading(false);
        setAllDocuments(result.response);
      }
    })
    .catch((error) => console.log("error", error));
};

export default GetAllDocuments;
