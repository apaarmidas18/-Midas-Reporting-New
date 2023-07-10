import axios from "axios";
import swal from "sweetalert";
import { nodeHost } from "../../static";
import GetAllChecklist from "./GetAllChecklist";

const DeleteChecklist = async (listId, setChecklist, setLoading) => {
  try {
    const options = {
      method: "PATCH",
      url: `${nodeHost}list/deleteList/${listId}`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.request(options);

    if (response.data.baseResponse.status === 1) {
      swal({
        title: "Submitted",
        text: "Checklist Submitted Successfully",
        icon: "success",
      });
      GetAllChecklist({ setChecklist, setLoading });
    }
  } catch (error) {
    swal({
      title: "Something Went Wrong!!",
      text: error,
      icon: "error",
    });
  }
};

export default DeleteChecklist;
