import { host, jobshost } from "../../static";

const AssignJobs = (assigned) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(assigned),
  };

  fetch(`${jobshost}jobAssignment/assignJob`, options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};

export default AssignJobs;
