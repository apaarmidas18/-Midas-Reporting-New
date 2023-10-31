import React from "react";
import BoldLabel from "../atoms/BoldLabel";
import InputField from "../atoms/InputField";
import Select from "../atoms/Select";
import assignee_stat from "../../utils/Jobs/assignee_stat";

const JobAssignmentRole = (props) => {
  const { finalClickInfo, setFinalClickInfo, dataByRole, teamLeadID } = props;
  //   console.log(dataByRole);
  //   console.log(teamLeadID, "tl");

  const user = JSON.parse(localStorage.getItem("User"));

  console.log(user);

  if (user.rollId == 7) {
    return (
      <div>
        <div className="row">
          <div className="col-md-6 ">
            <BoldLabel boldName="Assigner" boldFor="Assigner" />
            <InputField
              inptype="text"
              inpid="Assigner"
              inpvalue={"Nitesh Yadav"}
              style={{ fontSize: "15px", fontWeight: "500" }}
              disabled
            />
          </div>
          <div className="col-md-6 ">
            <BoldLabel boldName="Assignee Type" boldFor="Assignee Type" />
            <Select array={assignee_stat} selectName="Assignee" />
          </div>

          <div className="col-md-6 ">
            <BoldLabel boldName="Team Lead" boldFor="Team Lead" />
            <select
              class="form-select"
              aria-label="Default select example"
              name="Team Lead"
            >
              <option selected>Open this select menu</option>
              {teamLeadID.map((item, index) => {
                return <option>{item.name}</option>;
              })}
            </select>
          </div>
          <div className="col-md-6 ">
            <BoldLabel boldName="Recruiter" boldFor="Recruiter" />
            <select
              class="form-select"
              aria-label="Default select example"
              name="Team Lead"
            >
              <option selected>Please Select Team Lead</option>
              {dataByRole.map((item, index) => {
                return <option>{item.name}</option>;
              })}
            </select>
          </div>

          <span className="job-id-span mt-3">
            <strong>Job ID -</strong>{" "}
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
      </div>
    );
  } else if (
    user.rollId == 7 &&
    assignee_stat.value == "TL_ASSIGNED_FINAL_ASSIGNEE"
  ) {
    return (
      <div>
        <div className="row">
          <div className="col-md-6 ">
            <BoldLabel boldName="Assigner" boldFor="Assigner" />
            <InputField
              inptype="text"
              inpid="Assigner"
              inpvalue={"Nitesh Yadav"}
              style={{ fontSize: "15px", fontWeight: "500" }}
              disabled
            />
          </div>
          <div className="col-md-6 ">
            <BoldLabel boldName="Assignee Type" boldFor="Assignee Type" />
            <Select array={assignee_stat} selectName="Assignee" />
          </div>

          <div className="col-md-6 ">
            <BoldLabel boldName="Team Lead" boldFor="Team Lead" />
            <select
              class="form-select"
              aria-label="Default select example"
              name="Team Lead"
            >
              <option selected>Open this select menu</option>
              {teamLeadID.map((item, index) => {
                return <option>{item.name}</option>;
              })}
            </select>
          </div>

          <span className="job-id-span mt-3">
            <strong>Job ID -</strong>{" "}
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
      </div>
    );
  } else {
    return null;
  }

  //   return (
  //     <>
  //       <div>
  //         <div className="row">
  //           <div className="col-md-6 ">
  //             <BoldLabel boldName="Assigner" boldFor="Assigner" />
  //             <InputField
  //               inptype="text"
  //               inpid="Assigner"
  //               inpvalue={"Nitesh Yadav"}
  //               style={{ fontSize: "15px", fontWeight: "500" }}
  //               disabled
  //             />
  //           </div>
  //           <div className="col-md-6 ">
  //             <BoldLabel boldName="Assignee Type" boldFor="Assignee Type" />
  //             <Select array={assignee_stat} selectName="Assignee" />
  //           </div>

  //           <div className="col-md-6 ">
  //             <BoldLabel boldName="Team Lead" boldFor="Team Lead" />
  //             <select
  //               class="form-select"
  //               aria-label="Default select example"
  //               name="Team Lead"
  //             >
  //               <option selected>Open this select menu</option>
  //               {teamLeadID.map((item, index) => {
  //                 return <option>{item.name}</option>;
  //               })}
  //             </select>
  //           </div>
  //           <div className="col-md-6 ">
  //             <BoldLabel boldName="Recruiter" boldFor="Recruiter" />
  //             <select
  //               class="form-select"
  //               aria-label="Default select example"
  //               name="Team Lead"
  //             >
  //               <option selected>Please Select Team Lead</option>
  //               {dataByRole.map((item, index) => {
  //                 return <option>{item.name}</option>;
  //               })}
  //             </select>
  //           </div>

  //           <span className="job-id-span mt-3">
  //             <strong>Job ID -</strong>{" "}
  //             {finalClickInfo.map((item, index) => `${item.ProviderJobID}, `)}
  //           </span>
  //           <div className="col-md-12 text-center">
  //             <button
  //               className="btn job-common-btn"
  //               style={{ marginTop: "35px" }}
  //             >
  //               Submit
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </>
  //   );
};

export default JobAssignmentRole;
