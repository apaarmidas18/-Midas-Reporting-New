import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import BoldLabel from "../atoms/BoldLabel";
import InputField from "../atoms/InputField";
import html2canvas from "html2canvas";
import GetRates from "../../API/Rates/GetRates";
import { localStorageAvailable } from "@mui/x-data-grid/utils/utils";

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
      a.download = "screenshot.png";
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
        <div>
          <h2 className="text-center">Bill Rate Calculator</h2>
          <div className="download-buttons">
            <button className="ss-btn" onClick={captureScreenshot}>
              Image <i class="fa-solid fa-download"></i>
            </button>
            <button className="export-btn">
              Export <i class="fa-solid fa-download"></i>
            </button>
          </div>
        </div>
        {values === undefined || values === null ? (
          ""
        ) : (
          <Modal.Body>
            <div className="container">
              <div className="row calculator-row">
                <div className="col-md-6 input-div">
                  <h3>Input Parameters</h3>
                  <div className="row">
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
                  </div>
                </div>

                <div className="col-md-6">
                  <h3>Output Parameters</h3>
                  <div className="row" ref={targetElementRef}>
                    <div className="input-parameters col-md-6">
                      <BoldLabel boldFor="Location" boldName="Location" />
                      <InputField
                        inptype="text"
                        inpid="location"
                        inpcontrol="location"
                        inpvalue={values.City + "," + values.State}
                      />
                    </div>
                    <div className="input-parameters col-md-6">
                      <BoldLabel boldFor="Hour Rates" boldName="Hour Rates" />
                      <InputField
                        inptype="text"
                        inpid="hourRates"
                        inpname="hourRates"
                        inpvalue={
                          currentData !== ""
                            ? currentData.BillRate * 0.7
                            : values.BillRate * 0.7
                        }
                        inpcontrol
                      />
                    </div>
                    <div className="input-parameters col-md-6">
                      <BoldLabel
                        boldFor="Gross Weekly"
                        boldName="Gross Weekly"
                      />
                      <InputField
                        inptype="text"
                        inpid="grossWeekly"
                        inpname="grossWeekly"
                        inpvalue={
                          currentData !== ""
                            ? currentData.BillRate *
                              0.7 *
                              currentData.GuaranteedHours
                            : values.BillRate * 0.7 * values.GuaranteedHours
                        }
                        inpcontrol
                      />
                    </div>
                    <div className="input-parameters col-md-6">
                      <BoldLabel
                        boldFor="Non-Tax Rates"
                        boldName="Non-Tax Rates"
                      />
                      <InputField
                        inptype="number"
                        inpid="nonTax"
                        inpname="nonTax"
                        inpcontrol
                        inpvalue={
                          lodgingRate.length !== 0
                            ? lodgingRate[0].value + mealRate * 7
                            : 0
                        }
                      />
                    </div>

                    <div className="input-parameters col-md-6">
                      <BoldLabel
                        boldFor="Taxable Rates"
                        boldName="Taxable Rates"
                      />
                      <InputField
                        inptype="text"
                        inpid="taxRates"
                        inpname="taxRates"
                        inpcontrol
                        inpvalue={
                          currentData !== ""
                            ? currentData.BillRate *
                                0.7 *
                                currentData.GuaranteedHours -
                              lodRate
                            : values.BillRate * 0.7 * values.GuaranteedHours -
                              lodRate
                        }
                      />
                    </div>

                    <div className="input-parameters col-md-6">
                      <BoldLabel
                        boldFor="Guaranteed Hours"
                        boldName="Guaranteed Hours"
                      />
                      <InputField
                        inptype="text"
                        inpid="guarnhrs"
                        inpname="guarnhrs"
                        inpcontrol
                        inpvalue={
                          currentData !== ""
                            ? currentData.GuaranteedHours
                            : values.GuaranteedHours
                        }
                      />
                    </div>
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
