import React, { useState } from "react";
import { useLocation } from "react-router";
import Inputfield from "../../components/Inputfield";
const ChecklistDetails = () => {
  const location = useLocation();
  const { data } = location.state;
  const [references, setReferenes] = useState([
    {
      name: "",
      phoneno: "",
      email: "",
    },
  ]);

  const handleReferences = (e, index) => {
    const { name, value } = e.target;
    if (name === "phoneno") {
      const list = [...references];
      list[index][name] = parseInt(value);
      setReferenes(list);
    } else {
      const list = [...references];
      list[index][name] = value;
      setReferenes(list);
    }
  };

  const handleAddReference = (e) => {
    e.preventDefault();
    setReferenes([
      ...references,
      {
        name: "",
        phoneno: "",
        email: "",
      },
    ]);
  };

  return (
    <div>
      <div className="col-md-12 p-5">
        <div className="row">
          <div class="form-group row mb-3 d-flex align-items-center bg-light border rounded p-2">
            {/* ------------------------------------------------------------------------- */}
            <div className="form-group row mb-3 d-flex align-items-center">
              <Inputfield
                label={"Enter First Name"}
                value={data.firstname}
                type={"text"}
                placeholder={"First Name"}
                id={"firstname"}
                required={true}
                name={"firstname"}
              />
              <Inputfield
                label={"Enter Last Name"}
                value={data.lastname}
                type={"text"}
                placeholder={"Last Name"}
                id={"lastname"}
                required={true}
                name={"lastname"}
              />
              <Inputfield
                label={"Enter Phone number"}
                value={data.phoneno}
                type={"number"}
                placeholder={"Enter Phone number"}
                id={"phoneno"}
                required={true}
                name={"phoneno"}
              />
              <Inputfield
                label={"Enter E-mail"}
                value={data.email}
                type={"email"}
                placeholder={"Enter E-mail"}
                id={"email"}
                required={true}
                name={"email"}
              />

              <Inputfield
                label={"Date Of Birth"}
                value={data.dob}
                type={"button"}
                id={"dob"}
                required={true}
                name={"dob"}
                disabled={true}
                style={{ width: "180px" }}
              />

              <Inputfield
                label={"Last four SSN digit"}
                value={data.ssn}
                type={"number"}
                placeholder={"Last four SSN digit"}
                id={"name"}
                required={true}
                name={"ssn"}
              />

              {/* ------------------------------------------------------------------------- */}
            </div>
            <div className="form-group row mb-3 d-flex align-items-center">
              {data.references.map((item, index) => (
                <div className="row">
                  <Inputfield
                    label={"Enter Referre's Name"}
                    value={item.name}
                    type={"text"}
                    placeholder={"Full Name"}
                    onChange={(e) => handleReferences(e, index)}
                    id={"name"}
                    name={"name"}
                    required={false}
                  />
                  <Inputfield
                    label={"Enter Referre's Phone"}
                    value={item.phoneno}
                    type={"number"}
                    placeholder={"Enter Phone number"}
                    onChange={(e) => handleReferences(e, index)}
                    id={"phoneno"}
                    name={"phoneno"}
                    required={false}
                  />
                  <Inputfield
                    label={"Enter E-mail"}
                    value={item.email}
                    type={"email"}
                    placeholder={"Enter Referre's E-mail"}
                    onChange={(e) => handleReferences(e, index)}
                    id={"email"}
                    name={"email"}
                    required={false}
                  />
                </div>
              ))}
            </div>
            <div class="form-group row mt-3 ">
              <div className="col-md-11">
                <p>
                  <strong style={{ color: "#cb1829" }}>Instructions:</strong>{" "}
                  <span className="text-muted text-sm declare-para">
                    This checklist is meant to serve as a general guideline for
                    our client facilities as to the level of your skills within
                    your nursing specialty. Please use the scale below to
                    describe your experience/expertise in each area listed
                    below.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="form-group row mb-3">
          <div className="col-md-3">
            <p>
              <strong style={{ color: "#cb1829" }}>Proficiency Scale:</strong>
            </p>
          </div>
          <div className="col-md-6 profiency-level">
            <p>1 = No Experience</p>

            <p>2 = Need Training</p>

            <p>3 = Able to perform with supervision</p>

            <p>4 = Able to perform independently</p>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {data.list.map((item, index) => {
            return (
              <div
                className="col-md-4"
                style={{ display: "inherit" }}
                key={index}
              >
                <table className="table checklist-table table-bordered">
                  <thead className="health-table">
                    <tr>
                      <th className="health-row" colspan="4">
                        {item.title}
                      </th>
                      <th
                        className="health-row small"
                        style={{
                          width: "20px",
                          textAlign: "center",
                        }}
                        scope="col"
                      >
                        1
                      </th>
                      <th
                        className="health-row small"
                        style={{
                          width: "20px",
                          textAlign: "center",
                        }}
                        scope="col"
                      >
                        2
                      </th>
                      <th
                        className="health-row small"
                        style={{
                          width: "20px",
                          textAlign: "center",
                        }}
                        scope="col"
                      >
                        3
                      </th>
                      <th
                        className="health-row small"
                        style={{
                          width: "20px",
                          textAlign: "center",
                        }}
                        scope="col"
                      >
                        4
                      </th>
                    </tr>
                  </thead>
                  {item.items.map((ItemsVariable, index) => {
                    return (
                      <tbody key={index}>
                        <tr>
                          <th className="table-data" colspan="4" scope="row">
                            {ItemsVariable.name}
                          </th>

                          <td class="table-data">
                            {ItemsVariable.value1 !== "" ? (
                              <div
                                style={{
                                  height: "15px",
                                  width: "15px",
                                  background: "#0f875b",
                                  borderRadius: "50px",
                                  marginLeft: "12px",
                                }}
                                class="circle-box"
                              ></div>
                            ) : (
                              <input
                                type="radio"
                                value={"checked"}
                                id="flexRadioDefault1"
                                name={ItemsVariable.name}
                                required={true}
                              />
                            )}
                          </td>
                          <td class="table-data">
                            {ItemsVariable.value2 !== "" ? (
                              <div
                                style={{
                                  height: "15px",
                                  width: "15px",
                                  background: "#0f875b",
                                  borderRadius: "50px",
                                  marginLeft: "12px",
                                }}
                                class="circle-box"
                              ></div>
                            ) : (
                              <input
                                type="radio"
                                value={"checked"}
                                id="flexRadioDefault1"
                                name={ItemsVariable.name}
                                required
                              />
                            )}
                          </td>
                          <td class="table-data">
                            {ItemsVariable.value3 !== "" ? (
                              <div
                                style={{
                                  height: "15px",
                                  width: "15px",
                                  background: "#0f875b",
                                  borderRadius: "50px",
                                  marginLeft: "12px",
                                }}
                                class="circle-box"
                              ></div>
                            ) : (
                              <input
                                type="radio"
                                value={"checked"}
                                id="flexRadioDefault1"
                                name={ItemsVariable.name}
                                required
                              />
                            )}
                          </td>

                          <td class="table-data">
                            {ItemsVariable.value4 !== "" ? (
                              <div
                                style={{
                                  height: "15px",
                                  width: "15px",
                                  background: "#0f875b",
                                  borderRadius: "50px",
                                  marginLeft: "12px",
                                }}
                                class="circle-box"
                              ></div>
                            ) : (
                              <input
                                type="radio"
                                value={"checked"}
                                id="flexRadioDefault1"
                                name={ItemsVariable.name}
                                required
                              />
                            )}
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChecklistDetails;
