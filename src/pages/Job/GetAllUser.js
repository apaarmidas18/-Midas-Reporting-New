import React from 'react'

const GetAllUser = () => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",

  };

  fetch(`${host}auth/users/all-users?rollId=${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result) {
        return (
          setManager(result.payload),
          setRecruiterData(result.payload),
          setTeamlData(result.payload),
          setLoading(false)
        );
      }
    })
    .catch((error) => console.log("error", error));
}

export default GetAllUser