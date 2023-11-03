import React from 'react'
import axios from "axios";
import { jobshost } from '../../../static';
import swal from "sweetalert";

const DeleteVMS = (id) => {
 
    const options = {
      method: 'DELETE',
      url: `${jobshost}jobAssignment/deleteVmsConfig/${id}`,
      headers: {'User-Agent': 'insomnia/8.3.0'}
    };
    
    axios.request(options).then(function (response) {
    
      if (response.status == 204) {
        swal({
            title: "VMS has been deleted successfully.",
            text: `success`,
            icon: "success",
          }).then(() => {
            // Reload the page after the user clicks "OK" on the Swal alert
            window.location.reload();
          });;
      } 
    }).catch(function (error) {
      console.error(error);
      swal({
        title: "Error",
        text: 'error',
        icon: "error",
      });
    });

}

export default DeleteVMS