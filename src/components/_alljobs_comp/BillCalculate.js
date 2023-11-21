import React, { useState, useRef, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
// import BoldLabel from "../atoms/BoldLabel";
import InputField from "../atoms/InputField";
import html2canvas from "html2canvas";
import GetRates from "../../API/Rates/GetRates";
import { localStorageAvailable } from "@mui/x-data-grid/utils/utils";
import { HiOutlineDownload } from "react-icons/hi";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const BillCalculate = ({ values, onHide, show }) => {
  const dasssta = localStorage.getItem("Data");
  const targetElementRef = useRef(null);
  const [data, setData] = useState(values);

  const [currentData, setCurrentData] = useState("");
  const [lodgingRate, setLodgingRate] = useState([]);
  const [mealRate, setMealRate] = useState(0);

  const handleChange = (name, e) => {
    setCurrentData({ ...values, [name]: e.target.value });
  };

  const captureScreenshot = () => {
    const element = targetElementRef.current;

    if (!element) {
      console.error("Target element not found.");
      return;
    }

    html2canvas(element).then((canvas) => {
      const screenshotUrl = canvas.toDataURL();
      const a = document.createElement("a");
      a.href = screenshotUrl;
      a.download = "Paypackage.png";
      a.click();
    });
  };

  console.log("mealRate:", lodgingRate);

  useEffect(() => {
    values === undefined || values === null
      ? console.log("Waiting For Values")
      : GetRates(values, setMealRate, setLodgingRate);
  }, []);

  const lodRate =
    lodgingRate.length !== 0 ? lodgingRate[0].value + mealRate * 7 : 0;
  return (
    <>
      <Modal
        onHide={onHide}
        show={show}
        size="xl"
        contentClassName="bill-calculator"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Deal Sheet
          </Modal.Title>
        </Modal.Header>
        <div>{/* <h2 className="text-center">Bill Rate Calculator</h2> */}</div>
        {values === undefined || values === null ? (
          ""
        ) : (
          <Modal.Body>
            <div className="container">
              <div className="download-buttons mb-2">
                <button className="ss-btn" onClick={captureScreenshot}>
                  Image <i class="fa-solid fa-download"></i>
                </button>
                <button className="export-btn">
                  <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="export-list"
                    table="table-to-xls"
                    filename="Paypackage"
                    sheet="Paypackage"
                    buttonText=" Export"
                  />
                  <HiOutlineDownload size={22} />
                </button>
              </div>
              <div className="row calculator-row justify-content-center">
                <div className="col-md-5 input-div">
                  {/* <div className="row">
                    <div className="input-parameters col-md-6">
                      <BoldLabel boldFor="Bill Rate" boldName="Bill Rate" />
                      <InputField
                        inptype="number"
                        inpid="bill"
                        inpname="billRate"
                        inpvalue={
                          currentData !== ""
                            ? currentData.BillRate
                            : values.BillRate
                        }
                        inpcontrol
                        inpchange={(e) => handleChange("BillRate", e)}
                      />
                    </div>
                    <div className="input-parameters col-md-6">
                      <BoldLabel
                        boldFor="Guaranteed Hrs"
                        boldName="Guaranteed Hrs"
                      />
                      <InputField
                        inptype="text"
                        inpid="guarHrs"
                        inpname="guarHrs"
                        inpvalue={
                          currentData !== ""
                            ? currentData.GuaranteedHours
                            : values.GuaranteedHours
                        }
                        inpcontrol
                        inpchange={(e) => handleChange("GuaranteedHours", e)}
                      />
                    </div>
                    <div className="input-parameters col-md-6">
                      <BoldLabel boldFor="City" boldName="City" />
                      <InputField
                        inptype="text"
                        inpid="city"
                        inpname="city"
                        inpvalue={values.City}
                        inpcontrol
                      />
                    </div>
                    <div className="input-parameters col-md-6">
                      <BoldLabel boldFor="State" boldName="State" />
                      <InputField
                        inptype="text"
                        inpid="state"
                        inpname="state"
                        inpvalue={values.State}
                        inpcontrol
                      />
                    </div>

                    <div className="input-parameters col-md-6">
                      <BoldLabel boldFor="Job Type" boldName="Job Type" />
                      <InputField
                        inptype="text"
                        inpid="jobType"
                        inpname="jobType"
                        inpvalue={
                          values.WorkType == "1"
                            ? "Travel"
                            : values.WorkType == "2"
                            ? "Perm"
                            : values.WorkType == "3"
                            ? "Per Diem"
                            : values.WorkType
                        }
                        inpcontrol
                      />
                    </div>
                  </div> */}
                  <div className="row bill-table">
                    <div className="table-heading">
                      <h3>Billing</h3>
                    </div>
                    <table>
                      <tr>
                        <td>Bill Rate</td>
                        <td>
                          
                          <InputField
                            inptype="number"
                            inpid="bill"
                            inpname="billRate"
                            inpvalue={
                              currentData !== ""
                                ? currentData.BillRate
                                : values.BillRate
                            }
                            inpcontrol
                            inpchange={(e) => handleChange("BillRate", e)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Guaranteed Hrs</td>
                        <td>
                          <InputField
                            inptype="text"
                            inpid="guarHrs"
                            inpname="guarHrs"
                            inpvalue={
                              currentData !== ""
                                ? currentData.GuaranteedHours
                                : values.GuaranteedHours
                            }
                            inpcontrol
                            inpchange={(e) =>
                              handleChange("GuaranteedHours", e)
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>City</td>
                        <td>
                          
                          <InputField
                            inptype="text"
                            inpid="city"
                            inpname="city"
                            inpvalue={values.City}
                            inpcontrol
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>State</td>
                        <td>
                          <InputField
                            inptype="text"
                            inpid="state"
                            inpname="state"
                            inpvalue={values.State}
                            inpcontrol
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Job Type</td>
                        <td>
                          <InputField
                            inptype="text"
                            inpid="jobType"
                            inpname="jobType"
                            inpvalue={
                              values.WorkType == "1"
                                ? "Travel"
                                : values.WorkType == "2"
                                ? "Perm"
                                : values.WorkType == "3"
                                ? "Per Diem"
                                : values.WorkType
                            }
                            inpcontrol
                          />
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>

                <div className="col-md-5 input-div">
                  <div className="row bill-table output-table">
                    <div className="table-heading">
                      <h3>Paypackage</h3>
                    </div>
                    <table id="table-to-xls" ref={targetElementRef}>
                      <tr>
                        <td>Location</td>
                        <td>
                          <span>{values.City + "," + values.State}</span>
                          {/* <InputField
                              inptype="text"
                              inpid="location"
                              inpcontrol="location"
                              inpvalue={values.City + "," + values.State}
                            /> */}
                        </td>
                      </tr>
                      <tr>
                        <td>Hour Rates</td>
                        <td>
                          <span>
                            {(currentData !== ""
                              ? currentData.BillRate * 0.7
                              : values.BillRate * 0.7
                            ).toFixed(2)}
                          </span>
                          {/* <InputField
                              inptype="text"
                              inpid="hourRates"
                              inpname="hourRates"
                              inpvalue={(currentData !== ""
                                ? currentData.BillRate * 0.7
                                : values.BillRate * 0.7
                              ).toFixed(2)}
                              inpcontrol
                            /> */}
                        </td>
                      </tr>
                      <tr>
                        <td>Gross Weekly</td>
                        <td>
                          <span>
                            {(currentData !== ""
                              ? currentData.BillRate *
                                0.7 *
                                currentData.GuaranteedHours
                              : values.BillRate * 0.7 * values.GuaranteedHours
                            ).toFixed(2)}
                          </span>
                          {/* <InputField
                              inptype="text"
                              inpid="grossWeekly"
                              inpname="grossWeekly"
                              inpvalue={(currentData !== ""
                                ? currentData.BillRate *
                                  0.7 *
                                  currentData.GuaranteedHours
                                : values.BillRate * 0.7 * values.GuaranteedHours
                              ).toFixed(2)}
                              inpcontrol
                            /> */}
                        </td>
                      </tr>
                      <tr>
                        <td>Non-Tax Rates</td>
                        <td>
                          <span>
                            {lodgingRate.length !== 0
                              ? lodgingRate[0].value + mealRate * 7
                              : 0}
                          </span>
                          {/* <InputField
                              inptype="number"
                              inpid="nonTax"
                              inpname="nonTax"
                              inpcontrol
                              inpvalue={
                                lodgingRate.length !== 0
                                  ? lodgingRate[0].value + mealRate * 7
                                  : 0
                              }
                            /> */}
                        </td>
                      </tr>
                      <tr>
                        <td>Taxable Rates</td>
                        <td>
                          <span>
                            {(currentData !== ""
                              ? currentData.BillRate *
                                  0.7 *
                                  currentData.GuaranteedHours -
                                lodRate
                              : values.BillRate * 0.7 * values.GuaranteedHours -
                                lodRate
                            ).toFixed(2)}
                          </span>
                          {/* <InputField
                            inptype="text"
                            inpid="taxRates"
                            inpname="taxRates"
                            inpcontrol
                            inpvalue={(currentData !== ""
                              ? currentData.BillRate *
                                  0.7 *
                                  currentData.GuaranteedHours -
                                lodRate
                              : values.BillRate * 0.7 * values.GuaranteedHours -
                                lodRate
                            ).toFixed(2)}
                          /> */}
                        </td>
                      </tr>

                      <tr>
                        <td>Guaranteed Hours</td>
                        <td>
                          <span>
                            {currentData !== ""
                              ? currentData.GuaranteedHours
                              : values.GuaranteedHours}
                          </span>
                          {/* <InputField
                            inptype="text"
                            inpid="guarnhrs"
                            inpname="guarnhrs"
                            inpcontrol
                            inpvalue={
                              currentData !== ""
                                ? currentData.GuaranteedHours
                                : values.GuaranteedHours
                            }
                          /> */}
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        )}
      </Modal>
    </>
  );
};

export default BillCalculate;
