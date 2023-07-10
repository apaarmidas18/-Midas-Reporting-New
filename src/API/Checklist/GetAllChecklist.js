import { nodeHost } from "../../static";

const GetAllChecklist = ({ setChecklist, setLoading }) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(`${nodeHost}list/getFilledChecklist`, requestOptions)
    .then((response) => response.json())
    // .then((result) => console.log(result))
    .then((result) => {
      console.log("result:", result);
      if (result) {
        setLoading(false);
        setChecklist(result.response);
      }
    })
    .catch((error) => console.log("error", error));
};

export default GetAllChecklist;
