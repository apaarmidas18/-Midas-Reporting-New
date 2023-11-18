import React, { useEffect, useState } from "react";
import BoldLabel from "../atoms/BoldLabel";
import InputField from "../atoms/InputField";
import Select from "../atoms/Select";
import assignee_stat from "../../utils/Jobs/assignee_stat";
import tl_assignee_stat from "../../utils/Jobs/tl_assignee_stat";
import AssignJobs from "../../API/Jobs/AssignJobs";
import GetRolesAssignment from "../../API/Jobs/GetRolesAssignment";

const JobAssignmentRole = (props) => {
  const { finalClickInfo, setFinalClickInfo, selected } = props;
  const user = JSON.parse(localStorage.getItem("User"));
  const [isValidate, setIsValidate] = useState(false);
  const [teamLeadID, setTeamLeadID] = useState([]);
  const [dataByRole, setDataByRole] = useState([]);

  const [assigned, setAssigned] = useState({
    assigneeUserId: 0,
    assignerUserId: user.id,
    jobIds: finalClickInfo.map((item, index) => JSON.parse(item)),
    assignType: "",
  });
  console.log(assigned);

  const handleSubmit = async (e) => {
    AssignJobs(assigned);
    e.preventDefault();
  };

  const handleChange = (name, value) => {
    if (name == "assignerUserId" || name == "assigneeUserId") {
      setAssigned({ ...assigned, [name]: JSON.parse(value) });
    } else {
      setAssigned({ ...assigned, [name]: value });
    }
  };
  const userRoles = async () => {
    if (user.rollId === 7) {
      await GetRolesAssignment(setTeamLeadID, 6);
      await GetRolesAssignment(setDataByRole, 5);
    } else if (user.rollId === 6) {
      await GetRolesAssignment(setDataByRole, 5);
    } else {
      return null;
    }
  };
  useEffect(() => {
    userRoles();
  }, []);

  return (
    <>
      <div>
        <form
          className="g-3 needs-validation"
          noValidate
          onSubmit={handleSubmit}
        >
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
                required={true}
                selectChange={(e) => {
                  const selValue = JSON.parse(e.target.value);
                  console.log(selValue);
                  handleChange("assignType", selValue.value);
                }}
              />
            </div>

            <div className="col-md-6 ">
              <BoldLabel boldName="Team Lead" boldFor="Team Lead" />
              <select
                class="form-select"
                aria-label="Default select example"
                aria-describedby="validationServer04Feedback"
                required={true}
                name="Teamlead"
                disabled={
                  (assigned.assignType === "TL_ASSIGNED_FINAL_ASSIGNEE" &&
                    true) ||
                  (user.rollId === 6 && true)
                }
                onChange={(e) => {
                  handleChange("assigneeUserId", JSON.parse(e.target.value));
                  setIsValidate(false);
                }}
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
                name="assigneeUserId"
                required={true}
                disabled={
                  (assigned.assignType === "AM_ASSIGNED_TL" && true) ||
                  (assigned.assignType === "" && true)
                }
                onChange={(e) =>
                  handleChange("assigneeUserId", JSON.parse(e.target.value))
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
              {finalClickInfo.map((item, index) => `${item}, `)}
            </span>
            <div className="col-md-12 text-center">
              <button
                type="submit"
                className="btn job-common-btn"
                style={{ marginTop: "35px" }}
                disabled={isValidate}
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
