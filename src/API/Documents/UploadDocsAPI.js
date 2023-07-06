import { host } from "../../static";
import swal from "sweetalert";

const UploadDocsAPI = ({
  data,
  filename,
  file,
  setUploadDocResult,
  formattedDate,
  renewalInput,
  renewal,
}) => {
  const user = localStorage.getItem("User");
  const userData = JSON.parse(user);

  var FileNameRemoveSpace = filename.replace(/\s+/g, "");
  var RemoveSpaceUserName = userData.name.replace(/\s+/g, "");
  var DocumentName =
    renewal === true
      ? renewalInput + " " + FileNameRemoveSpace.toUpperCase()
      : FileNameRemoveSpace.toUpperCase();
  console.log("formattedDate:", formattedDate);
  var formdata = new FormData();
  formdata.append("file", file);
  formdata.append("fileName", DocumentName);
  formdata.append("expiryDate", formattedDate);

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
      console.log(result);
      if (result.status === 200) {
        swal({
          title: "Upload",
          text: "Document Uploaded Successfully",
          icon: "success",
        });
        // window.location.reload();
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
