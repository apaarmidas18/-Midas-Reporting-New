import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { AiOutlinePlus } from "react-icons/ai";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import { useDropzone } from "react-dropzone";

import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import GetAllDocuments from "../../API/Documents/GetAllDocuments";
import Modal from "react-bootstrap/Modal";
import countryCode from "../../utils/countryCode.json";
import SendTemplate from "../../API/Checklist/SendTemplate";
import DeleteZohoDocument from "../../API/Zoho-API/DeleteZohoDocument";

const ViewTemplates = () => {
  const navigate = useNavigate();
  var incrementState = 1;
  const [allDocuments, setAllDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [checked, setChecked] = useState(true);
  const [smschecked, setSmschecked] = useState(false);
  const [number, setNumber] = useState({});
  const [documentDetails, setDocumentDetails] = useState([]);
  const [docName, setDocName] = useState(documentDetails.template_name);
  const [notes, setNotes] = useState("");

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
  const handleClose = () => setShow(false);
  const handleShow = (data) => {
    setShow(true);
    setDocumentDetails(data);
    setReciept(data.actions);
  };

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

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

  var rows = [];

  useEffect(() => {
    GetAllDocuments({ setAllDocuments, setLoading });
  }, []);

  if (loading) {
    return "Wait";
  }

  /* ------------------------------------------Adding Elements To Array-------------------------------- */

  for (let index = 0; index < allDocuments.length; index++) {
    const element = allDocuments[index];
    console.log("element:L", element);
    rows.push({
      ...element,
      id: index + 1,
      modified_time: moment(element.modified_time).format("DD/MM/YYYY"),
      activeSign: "-",
      edit: (
        <div
          className="btn-grp"
          style={{ display: "flex", gap: "15px", justifyContent: "center" }}
        >
          <div class="dropdown">
            <button class="dropbtn">
              <i class="fa fa-ellipsis-h"></i>
            </button>
            <div class="dropdown-content">
              <div className="area-content">
                <Link to={"/dashboard/edit-templates"} state={element}>
                  <i
                    class="fa fa-pencil"
                    style={{ marginRight: "10px", color: "#000" }}
                  ></i>
                  Edit
                </Link>
                <a
                  target="__blank"
                  href={`https://sign.zoho.in/zs/60020492410#/template/viewer/${element.template_id}`}
                >
                  <i
                    class="fa-solid fa-file"
                    style={{ marginRight: "10px", color: "#000" }}
                  ></i>
                  View template
                </a>
                <Link href="/diversity">
                  <i
                    class="fa-solid fa-link"
                    style={{ marginRight: "10px", color: "#000" }}
                  ></i>
                  Create SignForm
                </Link>
                <Link href="/diversity">
                  <i
                    class="fa-solid fa-file-import"
                    style={{ marginRight: "10px", color: "#000" }}
                  ></i>
                  Edit as new
                </Link>
                <Link href="/diversity">
                  <i
                    class="fa-solid fa-share-from-square"
                    style={{ marginRight: "10px", color: "#000" }}
                  ></i>
                  Share
                </Link>
                <Link href="/diversity">
                  <i
                    class="fa-solid fa-rotate"
                    style={{ marginRight: "10px", color: "#000" }}
                  ></i>
                  Change ownership
                </Link>
                <Link href="/diversity">
                  <i
                    class="fa-sharp fa-solid fa-file-export"
                    style={{ marginRight: "10px", color: "#000" }}
                  ></i>
                  Export template
                </Link>
                <Link
                  to=""
                  style={{ color: "#cd1212" }}
                  onClick={() => DeleteZohoDocument(element.template_id)}
                >
                  <i
                    class="fa-solid fa-trash-can"
                    style={{ marginRight: "10px", color: "#cd1212" }}
                  ></i>
                  Delete
                </Link>
              </div>
            </div>
          </div>
          <div className="send-btn">
            <button
              onClick={() => handleShow(element)}
              class="dropbtn"
              style={{ border: "none", background: "transparent" }}
            >
              <i style={{ color: "black" }} class="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>
      ),
    });
  }
  /* ------------------------------------------Adding Elements To Array-------------------------------- */

  const data = {
    columns: [
      {
        label: "S.No",
        field: "id",
        sort: "asc",
        width: 150,
      },
      {
        label: "Template Name",
        field: "template_name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Owner",
        field: "owner_first_name",
        sort: "asc",
        width: 270,
      },
      {
        label: "Active Signforms",
        field: "activeSign",
        sort: "asc",
        width: 200,
      },
      {
        label: "Last Modified On",
        field: "modified_time",
        sort: "asc",
        width: 100,
      },

      {
        label: "Actions",
        field: "edit",
        sort: "asc",
        width: 100,
      },
    ],
    rows: rows,
  };

  /* ----------------------------API-CALL-ARRAY---------------------------- */
  const request = { actions: reciept, notes: notes };
  const tId = documentDetails.template_id;

  const SendDoc = (request, navigate, tId) => {
    SendTemplate(request, navigate, tId);
  };
  /* ----------------------------API-CALL-ARRAY---------------------------- */
  return (
    <>
      <div className="container-fluid">
        <div className="heading">
          <HeaderBreadcrumbs
            meta={"Templates"}
            main={"Templates"}
            heading={"Templates List"}
          />
          <div className="button-group">
            <Link to="/dashboard/add-templates">
              <button className="export-btn" style={{ width: "140px" }}>
                <AiOutlinePlus size={20} /> Create Template
              </button>
            </Link>
          </div>

          <Modal show={show} onHide={handleClose} contentClassName="main-modal">
            <Modal.Header closeButton>
              <Modal.Title>Send for signatures</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div class="mt-4 mb-3 col-md-12 setting-inputs">
                <label for="name" class="form-label">
                  Document Name
                </label>
                <div className="col-md-4">
                  <input
                    style={{ marginLeft: "62px" }}
                    type="text"
                    class="form-control"
                    id="doc_name"
                    aria-describedby="emailHelp"
                    name="doc_name"
                    required
                    value={documentDetails.template_name}
                    onChange={(e) => setDocName(e.target.value)}
                  />
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
              <div className="reciepts-modal">
                <h5>Recipients</h5>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="flexCheckDefault"
                    checked={checked}
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Send in orders
                  </label>
                </div>
                <button
                  className="close-customize bulk-close"
                  onClick={handleShow1}
                >
                  Add bulk recipients
                </button>
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
                          <button
                            className="custom-modal-btn"
                            onClick={handleShow2}
                          >
                            <i
                              style={{ marginRight: "5px" }}
                              class="fa fa-cog"
                            ></i>
                            Customize
                          </button>
                        </div>
                      </div>
                      <div className="row pmsg">
                        <div className="col-md-2">
                          <span>Private message :</span>
                        </div>
                        <div className="col-md-9 pmsg-para">
                          <p>Please get back to us for further queries</p>
                        </div>
                      </div>

                      <div className="row pmsg">
                        <div className="col-md-2">
                          <span>Authentication</span>
                        </div>
                        <div className="col-md-9 pmsg-para">
                          <p></p>
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
                    <div className="note-area">
                      <h5>Note to all recipients</h5>
                      <div className="col-md-7">
                        <textarea
                          class="form-control"
                          id="notes"
                          rows="4"
                          name="notes"
                          value={item.notes}
                          onChange={(e) => setNotes(e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                  </>
                );
              })}
            </Modal.Body>
            <Modal.Footer>
              <button className="modal-save" onClick={handleClose}>
                Close
              </button>
              <button
                className="modal-save"
                onClick={() => SendDoc(request, navigate, tId)}
              >
                Continue
              </button>

              <button className="custom-modal-btn">Quick send</button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={show1}
            onHide={handleClose1}
            contentClassName="bulk-modal"
          >
            <Modal.Header closeButton>
              <Modal.Title>Bulk import recipients</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="dropzone bulkupload" {...getRootProps()}>
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>Drop the files here ...</p>
                  ) : (
                    <p className="drop-para">
                      <i class="fa fa-file-text"></i>Drag 'n' drop files here,
                      or click to select files
                    </p>
                  )}
                </div>
                <aside>
                  <ul>{files}</ul>
                </aside>
              </div>
            </Modal.Body>
          </Modal>

          <Modal
            show={show2}
            onHide={handleClose2}
            contentClassName="customize-modal"
          >
            <Modal.Header closeButton>
              <Modal.Title>Customize</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="note-area">
                <h5>Private note</h5>
                <div className="col-md-7">
                  <textarea
                    class="form-control"
                    id="notes"
                    rows="4"
                    name="notes"
                  ></textarea>
                </div>
              </div>

              <div className="authentication-customize col-md-6">
                <h5>Authentication</h5>
                <label className="form-label" for="exampleFormControlSelect2">
                  Authentication Type
                </label>

                <select
                  class="form-select"
                  aria-label="Default select example"
                  name="verification_type"
                >
                  <option selected>Select</option>
                  <option>Email OTP</option>
                  <option>SMS OTP</option>
                </select>
              </div>
              <hr />
              <div className="interface col-md-6">
                <h5>Email and interface language</h5>
                <label className="form-label" for="exampleFormControlSelect2">
                  Select language
                </label>

                <select
                  class="form-select"
                  aria-label="Default select example"
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
                  Select the digital signature providers to be made available
                  for this recipient to sign this document(s) with.
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
                <label for="selected" style={{ marginLeft: "5px" }}>
                  Selected providers
                </label>
                <br></br>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button className="modal-save" onClick={handleClose2}>
                Close
              </button>
              <button className="custom-modal-btn">Save</button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>

      <div className="container-fluid round-border bg-white mt-4 p-2 px-4">
        <MDBDataTable striped bordered hover sorting={true} small data={data} />
      </div>
    </>
  );
};

export default ViewTemplates;
