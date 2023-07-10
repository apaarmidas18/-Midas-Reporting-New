import React, { useCallback, useState } from "react";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import DatalistInput from "react-datalist-input";
import { useMemo } from "react";
import Collapsible from "react-collapsible";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import countryCode from "../../utils/countryCode.json";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router";
import { dhost } from "../../static";

const AddTemplates = () => {
  var incrementState = 1;
  var filesArray = [];
  const [checked, setChecked] = useState(true);
  const [emailchecked, setEmailchecked] = useState(true);
  const [smschecked, setSmschecked] = useState(false);
  const [number, setNumber] = useState({});
  const [Tname, setTName] = useState("");
  const [expiry_days, setExpiry_days] = useState(15);
  const [reminder_days, setReminder_days] = useState(5);
  const [notes, setNotes] = useState({});
  const [on, setOn] = useState(true);
  const navigate = useNavigate();

  const [reciept, setReciept] = useState([
    {
      action_type: "SIGN",
      recipient_name: "",
      role: "",
      recipient_email: "",
      recipient_phonenumber: 0,
      recipient_countrycode: "",
      private_notes: "Please get back to us for further queries",
      verify_recipient: true,
      verification_type: "EMAIL",
      verification_code: "",
    },
  ]);

  const [show, setShow] = useState(false);
  const [otherInfo, setOtherInfo] = useState({});
  const [phoneNumber, setPhoneNumber] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const SIGN = [
    {
      value: "SIGN",

      label: "Needs to sign",
    },

    {
      value: "INPERSONSIGN",

      label: "In-person signer",
    },
    {
      value: "APPROVER",

      label: "Approver",
    },
    {
      value: "VIEW",

      label: "Recieves a copy",
    },
  ];

  const LINK = [
    {
      value: 1,

      label: "Email",
    },

    {
      value: 2,

      label: "Email+SMS",
    },
  ];

  const CODE = [
    '"+93"',
    '"+358"',
    '"+355"',
    '"+213"',
    '"+1684"',
    '"+376"',
    '"+244"',
    '"+1264"',
    '"+672"',
    '"+1268"',
    '"+54"',
    '"+374"',
    '"+297"',
    '"+61"',
    '"+43"',
    '"+994"',
    '"+1242"',
    '"+973"',
    '"+880"',
    '"+1246"',
    '"+375"',
    '"+32"',
    '"+501"',
    '"+229"',
    '"+1441"',
    '"+975"',
    '"+591"',
    '"+387"',
    '"+267"',
    '"+55"',
    '"+246"',
    '"+673"',
    '"+359"',
    '"+226"',
    '"+257"',
    '"+855"',
    '"+237"',
    '"+1"',
    '"+238"',
    '"+ 345"',
    '"+236"',
    '"+235"',
    '"+56"',
    '"+86"',
    '"+61"',
    '"+61"',
    '"+57"',
    '"+269"',
    '"+242"',
    '"+243"',
    '"+682"',
    '"+506"',
    '"+225"',
    '"+385"',
    '"+53"',
    '"+357"',
    '"+420"',
    '"+45"',
    '"+253"',
    '"+1767"',
    '"+1849"',
    '"+593"',
    '"+20"',
    '"+503"',
    '"+240"',
    '"+291"',
    '"+372"',
    '"+251"',
    '"+500"',
    '"+298"',
    '"+679"',
    '"+358"',
    '"+33"',
    '"+594"',
    '"+689"',
    '"+241"',
    '"+220"',
    '"+995"',
    '"+49"',
    '"+233"',
    '"+350"',
    '"+30"',
    '"+299"',
    '"+1473"',
    '"+590"',
    '"+1671"',
    '"+502"',
    '"+44"',
    '"+224"',
    '"+245"',
    '"+595"',
    '"+509"',
    '"+379"',
    '"+504"',
    '"+852"',
    '"+36"',
    '"+354"',
    '"+91"',
    '"+62"',
    '"+98"',
  ];

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...reciept];
    list[index][name] = value;
    setReciept(list);
  };
  const colours = [
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "purple",
    "light-green",
    "gray",
    "mint",
    "alice",
    "aqua",
  ];
  const getColour = () => colours[Math.floor(Math.random() * colours.length)];
  const addReceipt = (index) => {
    setReciept([
      ...reciept,
      {
        action_type: "SIGN",
        recipient_name: "",
        role: "",
        recipient_email: "",
        recipient_phonenumber: 0,
        recipient_countrycode: "",
        private_notes: "Please get back to us for further queries",
        verify_recipient: true,
        verification_type: "EMAIL",
        verification_code: "",
      },
    ]);
  };
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
  } = useDropzone();

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const createTemplate = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("docName", Tname);
    form.append("expirydays", expiry_days);
    form.append("in_sequence", checked);
    form.append("remiderInDays", reminder_days);
    form.append("email_reminders", on);
    form.append("notes", notes);
    form.append("formActions", JSON.stringify(reciept));
    form.append("file", acceptedFiles[0]);

    const options = {
      method: "POST",
      url: `${dhost}document/createNewTemplate`,
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=---011000010111000001101001",
      },
      data: form,
    };

    axios
      .request(options)
      .then(function(response) {
        var result = response.data;
        console.log(result);
        if (result.baseResponse.status == "success") {
          navigate("/dashboard/view-templates");
        }
      })

      .catch(function(error) {
        swal({
          title: "Submission Error.",
          title: error,
          icon: "error",
        });
      });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="heading">
          <HeaderBreadcrumbs
            meta={"Template"}
            main={"Template"}
            heading={"Template of Document"}
          />
        </div>
      </div>
      <form>
        <div className="container-fluid round-border bg-white p-4 mt-4 rounded-2xl">
          <div className="row">
            <div className="col-md-3">
              <div className="dropzone" {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p className="drop-para">
                    <i class="fa fa-file-text"></i>Drag 'n' drop files here, or
                    click to select files
                  </p>
                )}
              </div>
              <aside>
                <ul>{files}</ul>
              </aside>
            </div>
          </div>
        </div>
        <div className="container-fluid round-border bg-white p-4 mt-4 rounded-2xl">
          <div className="row">
            <div class="mb-3 col-md-6">
              <label for="name" class="form-label">
                Template Name
              </label>
              <input
                type="text"
                class="form-control"
                id="Tname"
                name="Tname"
                aria-describedby="emailHelp"
                onChange={(e) => setTName(e.target.value)}
                controlId="name"
                required
              />
            </div>

            <div className="reciept-check">
              <h5>Add recipients</h5>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="flexCheckDefault"
                  onClick={() => setChecked(!checked)}
                  checked={checked}
                />
                <label class="form-check-label" for="flexCheckDefault">
                  Send in orders
                </label>
              </div>
            </div>
            {reciept.map((item, index) => {
              item.signing_order = incrementState;
              return (
                <>
                  <div
                    className="reciept"
                    style={{ borderLeft: "4px solid " + getColour() }}
                  >
                    <div className="row">
                      <div class="mb-3 col-md-1">
                        <label for="name" class="form-label">
                          s.no
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          aria-describedby="emailHelp"
                          value={item.signing_order + index}
                          controlId="role"
                          name="role"
                          disabled
                        />
                      </div>
                      <div class="mb-3 col-md-5">
                        <label for="name" class="form-label">
                          Role
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="role"
                          aria-describedby="emailHelp"
                          onChange={(e) => handleChange(e, index)}
                          value={item.role}
                          controlId="role"
                          name="role"
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div class="mb-3 col-md-3">
                        <label for="name" class="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          class="form-control"
                          id="recipient_email"
                          aria-describedby="emailHelp"
                          onChange={(e) => handleChange(e, index)}
                          value={item.recipient_email}
                          name="recipient_email"
                          controlId="recipient_email"
                          required
                        />
                      </div>
                      <div class="mb-3 col-md-2">
                        <label for="name" class="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="recipient_name"
                          aria-describedby="emailHelp"
                          onChange={(e) => handleChange(e, index)}
                          value={item.recipient_name}
                          controlId="recipient_name"
                          name="recipient_name"
                          required
                        />
                      </div>
                      <div class="mb-3 col-md-2">
                        <label
                          className="form-label"
                          for="exampleFormControlSelect2"
                          style={{ marginBottom: "8px" }}
                        >
                          Sign
                        </label>

                        <select
                          class="form-select"
                          aria-label="Default select example"
                          onChange={(e) => handleChange(e, index)}
                          required
                          name="action_type"
                        >
                          <option selected>Select</option>
                          {SIGN.map((item, index) => {
                            return (
                              <option value={item.label}>{item.label}</option>
                            );
                          })}
                        </select>
                      </div>
                      <div class="mb-3 col-md-3">
                        <label
                          className="form-label"
                          for="exampleFormControlSelect2"
                          style={{ marginBottom: "8px" }}
                        >
                          Deliver link via
                        </label>
                        <div className="email-checkbox">
                          <span>Email</span>
                          <input
                            class="form-check-input"
                            type="radio"
                            id="emailcheck"
                            onClick={() => setSmschecked(false)}
                            value={"Email"}
                            onChange={(e) => console.log(e.target.value)}
                            name="checklink"
                          />

                          <span>Email + SMS</span>
                          <input
                            class="form-check-input"
                            type="radio"
                            id="smscheck"
                            onClick={() => setSmschecked(true)}
                            value={"Email + SMS"}
                            onChange={(e) => console.log(e.target.value)}
                            name="checklink"
                          />
                        </div>
                      </div>
                      <div className="mb-3 col-md-2">
                        <Button
                          variant="primary"
                          onClick={() => handleShow(item)}
                          className="custom-btn"
                        >
                          <i class="fa fa-cog"></i>
                          Customize
                        </Button>

                        <Offcanvas
                          show={show}
                          onHide={handleClose}
                          placement={"end"}
                        >
                          <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Customize</Offcanvas.Title>
                          </Offcanvas.Header>
                          <Offcanvas.Body>
                            <div class="form-group">
                              <h5>Private Note</h5>
                              <textarea
                                class="form-control"
                                id="private_notes"
                                rows="4"
                                name="private_notes"
                                onChange={(e) => handleChange(e, index)}
                              ></textarea>
                            </div>
                            <hr />
                            <div className="authentication-customize">
                              <h5>Authentication</h5>
                              <label
                                className="form-label"
                                for="exampleFormControlSelect2"
                              >
                                Authentication Type
                              </label>

                              <select
                                class="form-select"
                                aria-label="Default select example"
                                name="verification_type"
                                onChange={(e) => handleChange(e, index)}
                              >
                                <option selected>Select</option>
                                <option>Email OTP</option>
                                <option>SMS OTP</option>
                              </select>
                            </div>
                            <hr />
                            <div className="interface">
                              <h5>Email and interface language</h5>
                              <label
                                className="form-label"
                                for="exampleFormControlSelect2"
                              >
                                Select language
                              </label>

                              <select
                                class="form-select"
                                aria-label="Default select example"
                                onChange={(e) => handleChange(e, index)}
                                // valueitemvalues.roll}
                                name="authenticationtype"
                              >
                                <option selected>Select</option>
                                <option>English</option>
                                <option>Spanish</option>
                                <option>Russian</option>
                              </select>
                            </div>
                            <hr />
                            <div className="provider">
                              <h5>Digital signature providers</h5>
                              <p>
                                Select the digital signature providers to be
                                made available for this recipient to sign this
                                document(s) with.
                              </p>
                              <input
                                type="radio"
                                id="allprovide"
                                name="fav_language"
                                value="allprovider"
                              />
                              <label for="all" style={{ marginLeft: "5px" }}>
                                All providers enabled by administrator
                              </label>
                              <br />
                              <input
                                type="radio"
                                id="selectprovide"
                                name="fav_language"
                                value="selectprovider"
                              />
                              <label
                                for="selected"
                                style={{ marginLeft: "5px" }}
                              >
                                Selected providers
                              </label>
                              <br></br>
                            </div>
                            <div className="save-btn">
                              <button
                                className="save-customize"
                                onClick={handleClose}
                              >
                                Save
                              </button>
                              <button
                                className="close-customize"
                                onClick={handleClose}
                              >
                                Close
                              </button>
                            </div>
                          </Offcanvas.Body>
                        </Offcanvas>
                      </div>
                    </div>

                    {smschecked === true ? (
                      <>
                        <div className="row">
                          <div className="mb-3 col-md-3">
                            <label
                              className="form-label"
                              for="exampleFormControlSelect2"
                              style={{ marginBottom: "8px" }}
                            >
                              Select Code
                            </label>
                            <select
                              class="form-select"
                              aria-label="Default select example"
                              onChange={(e) => handleChange(e, index)}
                              name="recipient_countrycode"
                            >
                              <option selected>Select</option>
                              {countryCode.map((item, index) => {
                                return (
                                  <option value={item.dial_code}>
                                    {item.name} ( {item.dial_code})
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          <div class="mb-3 col-md-3">
                            <label for="name" class="form-label">
                              Phone Number
                            </label>
                            <input
                              type="number"
                              class="form-control"
                              id="recipient_phonenumber"
                              value={
                                smschecked == false ? (number = 0) : number
                              }
                              aria-describedby="emailHelp"
                              onChange={(e) => setNumber(e.target.value)}
                              controlId="recipient_phonenumber"
                              required
                            />
                          </div>
                        </div>
                      </>
                    ) : null}
                  </div>
                </>
              );
            })}
            <div style={{ marginTop: "10px" }}>
              <button className="add-reciept" onClick={() => addReceipt()}>
                <i class="fa-solid fa-plus" style={{ color: "black" }}></i> Add
                recipient
              </button>
            </div>
          </div>
          <div className="setting-collapse">
            <Collapsible
              trigger={[
                <span>More Settings</span>,
                <i
                  class="fas fa-chevron-right"
                  style={{ fontSize: "18px", marginTop: "2px" }}
                ></i>,
                ,
              ]}
            >
              <div class="mt-4 mb-3 col-md-12 setting-inputs">
                <label for="name" class="form-label">
                  Days to complete
                </label>
                <div className="col-md-4">
                  <input
                    style={{ marginLeft: "62px" }}
                    type="number"
                    class="form-control"
                    id="expiry_days"
                    value={expiry_days}
                    aria-describedby="emailHelp"
                    name="expiry_days"
                    onChange={(e) => setExpiry_days(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div class="mb-3 col-md-12 setting-inputs">
                <label className="form-label" for="exampleFormControlSelect2">
                  Document Type
                </label>

                <div className="col-md-4">
                  <select
                    style={{ marginLeft: "73px" }}
                    class="form-select"
                    aria-label="Default select example"
                    name="document_type"
                  >
                    <option selected>Others</option>
                  </select>
                </div>
              </div>
              <div class="mb-3 col-md-12 setting-inputs">
                <label className="form-label" for="exampleFormControlSelect2">
                  Folder to add documents to
                </label>
                <div className="col-md-4">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    name="document_type"
                  >
                    <option selected>None</option>
                  </select>
                </div>
              </div>
              <div class="mb-3 col-md-12 setting-inputs">
                <label for="name" class="form-label">
                  Description
                </label>
                <div className="col-md-4">
                  <textarea
                    style={{ marginLeft: "100px" }}
                    class="form-control"
                    id="description"
                    rows="2"
                    name="description"
                    required
                  ></textarea>
                </div>
              </div>
              <div
                class="mb-3 col-md-12 setting-inputs"
                style={{ alignItems: "normal" }}
              >
                <label for="name" class="form-label">
                  Automatic reminders
                </label>
                <div className="col-md-4">
                  <p style={{ marginLeft: "40px" }}>
                    <input
                      type="checkbox"
                      id="switch3"
                      switch="bool"
                      onClick={() => setOn(!on)}
                      checked={on}
                    />
                    <label
                      for="switch3"
                      data-on-label="On"
                      data-off-label="Off"
                    ></label>
                  </p>
                  {on === true ? (
                    <p>
                      Automatic reminder will be delivered via email even if the
                      delivery mode is set to 'Email + SMS'.
                    </p>
                  ) : (
                    <p>
                      If enabled, automatic reminders will only be delivered via
                      email.
                    </p>
                  )}
                </div>
              </div>
              <div class="mb-3 col-md-12 setting-inputs">
                <label for="name" class="form-label">
                  Send a reminder every
                </label>
                <div
                  className="col-md-2"
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "15px",
                  }}
                >
                  {on === false ? (
                    <input
                      type="number"
                      class="form-control"
                      id="reminder_days"
                      aria-describedby="emailHelp"
                      name="reminder_days"
                      value={reminder_days}
                      onChange={(e) => setReminder_days(e.target.value)}
                      style={{ textAlign: "right", marginLeft: "40px" }}
                      disabled
                    />
                  ) : (
                    <input
                      type="text"
                      class="form-control"
                      id="recipient_name"
                      aria-describedby="emailHelp"
                      value={reminder_days}
                      name="recipient_name"
                      style={{ textAlign: "right", marginLeft: "40px" }}
                      required
                    />
                  )}

                  <label for="name" class="form-label">
                    days
                  </label>
                </div>
              </div>
            </Collapsible>
          </div>
          <div className="note-area">
            <h5>Note to all recipients</h5>
            <div className="col-md-7">
              <textarea
                class="form-control"
                id="notes"
                rows="4"
                name="notes"
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="save-btn-grp" style={{ marginTop: "22px" }}>
            <button
              onClick={(e) => createTemplate(e)}
              className="save-customize"
            >
              Continue
            </button>
            <button className="close-customize">Close</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddTemplates;
