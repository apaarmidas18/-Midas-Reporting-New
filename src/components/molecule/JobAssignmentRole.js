import React, { useState } from "react";
import BoldLabel from "../atoms/BoldLabel";
import InputField from "../atoms/InputField";
import Select from "../atoms/Select";
import assignee_stat from "../../utils/Jobs/assignee_stat";
import tl_assignee_stat from "../../utils/Jobs/tl_assignee_stat";
import AssignJobs from "../../API/Jobs/AssignJobs";

const JobAssignmentRole = (props) => {
  const { finalClickInfo, setFinalClickInfo, dataByRole, teamLeadID } = props;
  const user = JSON.parse(localStorage.getItem("User"));
  const [assigned, setAssigned] = useState({
    assigneeUserId: user.id,
    assignerUserId: 0,
    jobIds: finalClickInfo.map((item, index) => item.ProviderJobID),
    assigneeType: "",
  });

  const handleSubmit = async (e) => {
    AssignJobs(assigned);
    e.preventDefault();
  };

  const handleChange = (name, value) => {
    if (name === "assignerUserId" || name === "assigneeUserId")
      setAssigned({ ...assigned, [name]: JSON.parse(value) });
  };
  console.log(assigned);

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 ">
              <BoldLabel boldName="Assigner" boldFor="Assigner" />
              <InputField
                inptype="text"
                inpid="Assigner"
                inpname="assigner"
                inpvalue={user.name}
                style={{ fontSize: "15px", fontWeight: "500" }}
                inpchange={() => handleChange("assigneeUserId", user.id)}
                disabled
              />
            </div>
            <div className="col-md-6 ">
              <BoldLabel boldName="Assignee Type" boldFor="Assignee Type" />
              <Select
                array={user.rollId == 6 ? tl_assignee_stat : assignee_stat}
                selectName="Assignee"
                required
                selectChange={(e) => {
                  const selValue = JSON.parse(e.target.value);
                  handleChange("assigneeType", selValue.value);
                }}
              />
            </div>

            <div className="col-md-6 ">
              <BoldLabel boldName="Team Lead" boldFor="Team Lead" />
              <select
                class="form-select"
                aria-label="Default select example"
                aria-describedby="validationServer04Feedback"
                required
                name="Teamlead"
                disabled={
                  (assigned.assigneeType === "TL_ASSIGNED_FINAL_ASSIGNEE" &&
                    true) ||
                  (user.rollId === 6 && true)
                }
                onChange={(e) =>
                  handleChange("assignerUserId", JSON.parse(e.target.value))
                }
              >
                <option selected>Open this select menu</option>
                {teamLeadID.map((item, index) => {
                  return <option value={item.id}>{item.name}</option>;
                })}
              </select>
            </div>
            <div className="col-md-6 ">
              <BoldLabel boldName="Recruiter" boldFor="Recruiter" />
              <select
                class="form-select"
                aria-label="Default select example"
                name="finalassigner"
                required
                disabled={
                  (assigned.assigneeType === "AM_ASSIGNED_TL" && true) ||
                  (assigned.assigneeType === "" && true)
                }
                onChange={(e) =>
                  handleChange("assignerUserId", JSON.parse(e.target.value))
                }
              >
                <option selected>Please Select Recruiter</option>
                {dataByRole.map((item, index) => {
                  return <option value={item.id}>{item.name}</option>;
                })}
              </select>
            </div>

            <span className="job-id-span mt-3">
              <strong>Job ID -</strong>
              {finalClickInfo.map((item, index) => `${item.ProviderJobID}, `)}
            </span>
            <div className="col-md-12 text-center">
              <button
                className="btn job-common-btn"
                style={{ marginTop: "35px" }}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default JobAssignmentRole;
