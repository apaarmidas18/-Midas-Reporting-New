import { host } from "../../static";
import swal from "sweetalert";

const UploadDocsAPI = ({ data, filename, file, setUploadDocResult }) => {
  const user = localStorage.getItem("User");
  const userData = JSON.parse(user);

  var FileNameRemoveSpace = filename.replace(/\s+/g, "");
  var RemoveSpaceUserName = userData.name.replace(/\s+/g, "");
  var DocumentName = FileNameRemoveSpace.toUpperCase();

  var formdata = new FormData();
  formdata.append("file", file);
  formdata.append("fileName", DocumentName);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch(
    `${host}auth/employee/uploadFiles/${data.employeeId}/${data.id}?userName=${RemoveSpaceUserName}&userId=${userData.id}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      if (result.status === 200) {
        swal({
          title: "Upload",
          text: "Document Uploaded Successfully",
          icon: "success",
        });
        window.location.reload();
      } else {
        swal({
          title: "Upload",
          text: result.message,
          icon: "warning",
        });
      }
      setUploadDocResult(result);
    })
    .catch((error) => console.log("error", error));
};

export default UploadDocsAPI;
