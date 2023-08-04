import React from "react";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import GetAllEmployee from "../../API/Employee/GetAllEmployee";
import moment from "moment";
import { useState } from "react";
import { useEffect } from "react";
import TabName from "../../components/TabName";
import Modal from "react-bootstrap/Modal";

const ActiveCandidates = () => {
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [loading, setLoading] = useState("");
  const [show, setShow] = useState(false);
  var rows = [];
  useEffect(() => {
    GetAllEmployee({ setEmployeeDetails, setLoading });
  }, []);

  //Modal  Bootstrap ******************************************
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  for (let index = 0; index < employeeDetails.length; index++) {
    const element = employeeDetails[index];

    rows.push({
      ...element,
      createDate: moment(element.createDate).format("MM/DD/YYYY"),
      edit: (
        <button type="button" class="edit-btn" onClick={handleShow}>
          <i class="fa fa-pencil"></i>
        </button>
      ),
    });
  }
  const data = {
    columns: [
      {
        label: "S.No",
        field: "id",
        sort: "asc",
        width: 10,
      },
      {
        label: "Candidate Name",
        field: "name",
        sort: "asc",
        width: 50,
      },
      {
        label: "JA",
        field: "employeeId",
        sort: "asc",
        width: 10,
      },

      {
        label: "Phone",
        field: "phone",
        sort: "asc",
        width: 50,
      },
      {
        label: "Email",
        field: "email",
        sort: "asc",
        width: 50,
      },
      {
        label: "Start Date",
        field: "createDate",
        sort: "asc",
        width: 50,
      },
      {
        label: "End Date",
        field: "createDate",
        sort: "asc",
        width: 50,
      },
      {
        label: "Shift",
        field: "shift",
        sort: "asc",
        width: 50,
      },
      {
        label: "Compliance",
        field: "shift",
        sort: "asc",
        width: 50,
      },
      {
        label: "Client Name",
        field: "clientname",
        sort: "asc",
        width: 50,
      },
      {
        label: "Job Id",
        field: "jobid",
        sort: "asc",
        width: 50,
      },
      {
        label: "Sales Rep",
        field: "jobid",
        sort: "asc",
        width: 50,
      },
      {
        label: "VMS",
        field: "vms",
        sort: "asc",
        width: 50,
      },
      {
        label: "Professional",
        field: "professional",
        sort: "asc",
        width: 50,
      },
      {
        label: "Speciality",
        field: "speciality",
        sort: "asc",
        width: 50,
      },
      {
        label: "Details",
        field: "edit",
        sort: "asc",
        width: 50,
      },
    ],
    rows: rows,
  };
  return (
    <>
      <div className="container-fluid tab-container">
        <TabName tabname="Active Candidates" />
        <div className="job-modal-container">
          <Modal
            show={show}
            onHide={handleClose}
            contentClassName="job-modal"
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>
                Job Details <span>(Job ID - 38182)</span>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-7">
                    <div className="row job-select-row">
                      <div className="col-md-4 job-select">
                        <label>Candidate</label>
                        <input
                          type="text"
                          class="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Candidate Name"
                        />
                      </div>
                      <div className="col-md-4 job-select">
                        <label>Status</label>
                        <select
                          class="form-select"
                          aria-label="Default select example"
                        >
                          <option selected>Select Status</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      </div>
                      <div className="col-md-4 job-select">
                        <label>Status Reason</label>
                        <select
                          class="form-select"
                          aria-label="Default select example"
                        >
                          <option selected>Select Reason</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      </div>
                      <div className="col-md-4 job-select">
                        <label>Start Date</label>
                        <input
                          type="date"
                          class="form-control"
                          placeholder="Start Date"
                        />
                      </div>
                      <div className="col-md-4 job-select">
                        <label>End Date</label>
                        <input
                          type="date"
                          class="form-control"
                          placeholder="End Date"
                        />
                      </div>
                      <div className="col-md-4 job-select">
                        <label>Shift</label>
                        <select
                          class="form-select"
                          aria-label="Default select example"
                        >
                          <option selected>Shift Timing</option>
                          <option value="1">7am-7pm</option>
                          <option value="2">8am-8pm</option>
                          <option value="3">9am-9pm</option>
                        </select>
                      </div>
                      <div className="col-md-4 mb-2 job-select">
                        <label>Shift per Week</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Shift (Weekly)"
                        />
                      </div>
                      <div className="col-md-4 job-select">
                        <label>Shift Start Time</label>
                        <input type="time" class="form-control" />
                      </div>
                      <div className="col-md-4 job-select">
                        <label>Shift End Time</label>
                        <input type="time" class="form-control" />
                      </div>
                      <div className="col-md-4 job-select">
                        <label>Job Posting Id</label>
                        <input type="text" class="form-control" />
                      </div>

                      {/* //New Row **************************************************************                       */}
                    </div>
                    <div className="row job-select-row mt-2">
                      <div className="col-md-4 job-select">
                        <label>Division</label>
                        <select
                          class="form-select"
                          aria-label="Default select example"
                        >
                          <option selected>Division</option>
                          <option value="1">Nursing</option>
                          <option value="2">Doctor</option>
                        </select>
                      </div>
                      <div className="col-md-4 job-select">
                        <label>Profession</label>
                        <select
                          class="form-select"
                          aria-label="Default select example"
                        >
                          <option selected>Profession</option>
                          <option value="1">RN</option>
                          <option value="2">Nurse</option>
                        </select>
                      </div>
                      <div className="col-md-4 job-select">
                        <label>Speciality</label>
                        <select
                          class="form-select"
                          aria-label="Default select example"
                        >
                          <option selected>Profession</option>
                          <option value="1">ER</option>
                          <option value="2">OPT</option>
                          <option value="2">ENT</option>
                        </select>
                      </div>
                      <div className="col-md-4 job-select mb-2">
                        <label>Floating Required</label>
                        <div className="job-radio d-flex">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                          />
                          <label
                            class="form-check-label"
                            style={{ marginRight: "25px" }}
                            for="flexRadioDefault1"
                          >
                            No
                          </label>
                          <input
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                            checked
                          />
                          <label
                            class="form-check-label"
                            for="flexRadioDefault2"
                          >
                            Yes
                          </label>
                        </div>
                      </div>
                      <div className="col-md-4 job-select mb-2">
                        <label>Call Required</label>
                        <div className="job-radio d-flex">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                          />
                          <label
                            class="form-check-label"
                            style={{ marginRight: "25px" }}
                            for="flexRadioDefault1"
                          >
                            No
                          </label>
                          <input
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                            checked
                          />
                          <label
                            class="form-check-label"
                            for="flexRadioDefault2"
                          >
                            Yes
                          </label>
                        </div>
                      </div>

                      <div className="col-md-4 job-select">
                        <label>Hot Job</label>
                        <div className="job-radio d-flex">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                          />
                          <label
                            class="form-check-label"
                            style={{ marginRight: "25px" }}
                            for="flexRadioDefault1"
                          >
                            No
                          </label>
                          <input
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                            checked
                          />
                          <label
                            class="form-check-label"
                            for="flexRadioDefault2"
                          >
                            Yes
                          </label>
                        </div>
                      </div>

                      <div className="col-md-4 job-select">
                        <label>If Yes, Where?</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Float to Areas of Competency"
                        />
                      </div>

                      <div className="col-md-4 job-select">
                        <label>Amount of Call Required</label>
                        <input type="text" class="form-control" disabled />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="row">
                      <div className="col-md-6 job-select">
                        <label>Division</label>
                        <select
                          class="form-select"
                          aria-label="Default select example"
                        >
                          <option selected>Division</option>
                          <option value="1">Nursing</option>
                          <option value="2">Doctor</option>
                        </select>
                      </div>
                      <div className="col-md-6 job-select">
                        <label>MSA</label>
                        <div className="job-radio d-flex">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                          />
                          <label
                            class="form-check-label"
                            style={{ marginRight: "25px" }}
                            for="flexRadioDefault1"
                          >
                            No
                          </label>
                          <input
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                            checked
                          />
                          <label
                            class="form-check-label"
                            for="flexRadioDefault2"
                          >
                            Yes
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 job-select">
                        <label>Sales Rep</label>
                        <select
                          class="form-select"
                          aria-label="Default select example"
                        >
                          <option selected>Select Sales</option>
                          <option value="1">Field Barry</option>
                          <option value="2">Doctor</option>
                        </select>
                      </div>
                      <div className="col-md-6 job-select">
                        <label>VMS</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="VMS"
                        />
                      </div>
                      <div className="col-md-6 job-select">
                        <label>Staffing Specialist</label>
                        <select
                          class="form-select"
                          aria-label="Default select example"
                        >
                          <option selected>Select Staffing Specialist</option>
                          <option value="1">Field Barry</option>
                          <option value="2">Doctor</option>
                        </select>
                      </div>
                      <div className="col-md-6 job-select">
                        <label>City</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Enter City"
                        />
                      </div>

                      <div className="col-md-6 job-select">
                        <label>State</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Enter State"
                        />
                      </div>
                      <div className="col-md-6 job-select">
                        <label>Zip</label>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter Zip"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
        <div className="container-fluid job-table">
          <MDBDataTable
            id="table-to-xls"
            striped
            bordered
            hover
            sorting={true}
            small
            data={data}
          />
        </div>
      </div>
    </>
  );
};

export default ActiveCandidates;
