import React, { useEffect, useState } from "react";
import InputField from "../atoms/InputField";
import AssignJobs from "../../API/Jobs/AssignJobs";
import GetAllUsers from "../../API/User/GetAllUsers";

const JobAssignmentRole = (props) => {
  const { finalClickInfo, teamLead, recruiterData , setAllJobs, setIsloading } = props;
  const user = JSON.parse(localStorage.getItem("User"));
  const [refreshTable, setRefreshTable] = useState(false);
  const [isValidate, setIsValidate] = useState(false);
  const [teamLeadID, setTeamLeadID] = useState([]);
  const [recruiter, setRecruiter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [teamLeadId, setTeamLeadId] = useState(0);
  const [account_manager, setAccount_manager] = useState([]);
  const [teamlead, setTeamLead] = useState([]);
  const [assigned, setAssigned] = useState({
    assigneeUserId: 0,
    assignerUserId: user.id,
    jobIds: finalClickInfo.map((item, index) => JSON.parse(item)),
    assignType: "",
  });

  const handleInputChange = (name, value, type) => {
    setAssigned({ ...assigned, [name]: value, assignType: type });
  };

  const handleSubmit = async (e) => {
    AssignJobs(assigned , setAllJobs, setIsloading);
    e.preventDefault();
  };

  const handleCheckuser = () => {
    var tel = teamLead.filter((item, index) => item.managerId === user.id);
    setTeamLead(tel);
  };

  console.log(assigned);

  useEffect(() => handleCheckuser(), []);

  return (
    <div>
      <form className="g-3 needs-validation" noValidate onSubmit={handleSubmit}>
        <div className="row">
          <div className="assign-container">
            <InputField label="Assignee" inpvalue={user.name} disabled />
            <div className="col-md-4 mx-2 mt-2">
              <label for="floatingSelectGrid">Select Team Lead</label>
              <select
                class="form-select"
                id="floatingSelectGrid"
                aria-label="Floating label select example"
                onChange={(e) => {
                  handleInputChange(
                    "assigneeUserId",
                    JSON.parse(e.target.value),
                    "AM_ASSIGNED_TL"
                  );
                  setTeamLeadId(JSON.parse(e.target.value));

                  setRecruiter(
                    recruiterData.filter(
                      (item, index) =>
                        item.managerId === JSON.parse(e.target.value)
                    )
                  );
                }}
              >
                <option selected value={"0"}>
                  Open this select menu
                </option>
                {teamlead.map((item, index) => {
                  return <option value={item.id}>{item.name}</option>;
                })}
              </select>
            </div>

            <div className="col-md-4 mx-2 mt-2">
              <label for="floatingSelectGrid">Select Recruiter</label>
              <select
                class="form-select"
                id="floatingSelectGrid"
                aria-label="Floating label select example"
                onChange={(e) => {
                  if (user.rollId === 7) {
                    handleInputChange(
                      "assigneeUserId",
                      JSON.parse(e.target.value),
                      "AM_ASSIGNED_RECRUITER"
                    );
                  } else {
                    handleInputChange(
                      "assignee",
                      JSON.parse(e.target.value),
                      "TL_ASSIGNED_FINAL_ASSIGNEE"
                    );
                  }
                }}
              >
                <option selected value={"0"}>
                  Open this select menu
                </option>
                {recruiter.map((item, index) => {
                  return <option value={item.id}>{item.name}</option>;
                })}
              </select>
            </div>
          </div>
          <div>
            <span className="job-id-span mt-3">
              <div>
                <strong>Job ID -</strong>
                {finalClickInfo.map((item, index) => `${item}, `)}
              </div>
              <button
                type="submit"
                className="btn job-common-btn"
                disabled={isValidate}
              >
                Submit
              </button>
            </span>
          </div>
          {/* <div className="col-md-6">
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

          <div className="col-md-6">
            <BoldLabel boldName="Team Lead" boldFor="Team Lead" />
            <select
              class="form-select"
              aria-label="Default select example"
              aria-describedby="validationServer04Feedback"
              required={true}
              name="Teamlead"
              disabled={
                (assigned.assignType === "AM_ASSIGNED_RECRUITER" && true) ||
                (user.rollId === 6 && true)
              }
              onChange={(e) => {
                if (user.rollId === 7) {
                  handleChange("assigneeUserId", JSON.parse(e.target.value));
                  handleChange("assignType", "AM_ASSIGNED_TL");
                }
              }}
            >
              <option selected>Open this select menu</option>
              {teamLeadID.map((item, index) => {
                return <option value={item.id}>{item.name}</option>;
              })}
            </select>
          </div>

          <div className="col-md-6">
            <BoldLabel boldName="Recruiter" boldFor="Recruiter" />
            <select
              class="form-select"
              aria-label="Default select example"
              name="assigneeUserId"
              required={true}
              disabled={assigned.assignType === "AM_ASSIGNED_TL" && true}
              onChange={(e) => {
                if (user.rollId === 7) {
                  handleChange("assigneeUserId", JSON.parse(e.target.value));
                  handleChange("assignType", "AM_ASSIGNED_RECRUITER");
                } else if (user.rollId === 6) {
                  handleChange("assigneeUserId", JSON.parse(e.target.value));
                  handleChange("assignType", "TL_ASSIGNED_FINAL_ASSIGNEE");
                }
              }}
            >
              <option selected>Please Select Recruiter</option>
              {dataByRole.map((item, index) => {
                return <option value={item.id}>{item.name}</option>;
              })}
            </select>
          </div>

          

          <div className="col-md-12 text-center">
            
          </div> */}
        </div>
      </form>
    </div>
  );
};

export default JobAssignmentRole;
