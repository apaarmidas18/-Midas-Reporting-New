import { dhost } from "../../static";
const token = localStorage.getItem("token");

const FindTemplateById = ({
  setTemplateDetails,
  setLoading,
  tId,
  setErrorText,
  setReciept,
}) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(`${dhost}document/findTemplatesById/${tId}`, requestOptions)
    .then((response) => response.json())
    // .then((result) => console.log(result))
    .then((result) => {
      if (result.baseResponse.status === 1) {
        setLoading(false);
        setTemplateDetails(result.response);
        setReciept(result.response);
      } else {
        setLoading(false);
        setErrorText(result.baseResponse.message);
      }
    })
    .catch((error) => console.log("error", error));
};

export default FindTemplateById;
