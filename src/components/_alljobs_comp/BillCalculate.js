import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import BoldLabel from "../atoms/BoldLabel";
import InputField from "../atoms/InputField";
import html2canvas from 'html2canvas';

const BillCalculate = (props) => {
  const targetElementRef = useRef(null);

  const captureScreenshot = () => {
    const element = targetElementRef.current;

    if (!element) {
      console.error('Target element not found.');
      return;
    }

    html2canvas(element).then((canvas) => {
      const screenshotUrl = canvas.toDataURL();
      const a = document.createElement('a');
      a.href = screenshotUrl;
      a.download = 'screenshot.png';
      a.click();
    });
  };


  return (
    <>

      <Modal
        {...props}
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
        <div >
        <h2 className="text-center">Bill Rate Calculator</h2>
        <div className="download-buttons">
        <button className="ss-btn" onClick={captureScreenshot}>Image <i class="fa-solid fa-download"></i></button>
        <button className="export-btn">Export <i class="fa-solid fa-download"></i></button>
        </div>
        </div>
        <Modal.Body>
          <div className="container" ref={targetElementRef}>
            <div className="row calculator-row">
            
              <div className="col-md-6 input-div">
              <h3>Input Parameters</h3>
                <div className="row">
                  <div className="input-parameters col-md-6">
                    <BoldLabel boldFor="Bill Rate" boldName="Bill Rate" />
                    <InputField
                      inptype="text"
                      inpid="bill"
                      inpname="billRate"
                      
                      inpcontrol
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
                      
                      inpcontrol
                    />
                  </div>
                  <div className="input-parameters col-md-6">
                    <BoldLabel boldFor="City" boldName="City" />
                    <InputField
                      inptype="text"
                      inpid="city"
                      inpname="city"
                      
                      inpcontrol
                    />
                  </div>
                  <div className="input-parameters col-md-6">
                    <BoldLabel boldFor="State" boldName="State" />
                    <InputField
                      inptype="text"
                      inpid="state"
                      inpname="state"
                      
                      inpcontrol
                    />
                  </div>

                  

                  <div className="input-parameters col-md-6">
                    <BoldLabel boldFor="Job Type" boldName="Job Type" />
                    <InputField
                      inptype="text"
                      inpid="jobType"
                      inpname="jobType"
                      
                      inpcontrol
                    />
                  </div>
                  <div className="input-parameters col-md-6 mt-4">
                  <Button variant="primary">Calculate</Button>
                </div>
                </div>
               
              </div>
                
              <div className="col-md-6">
              <h3>Output Parameters</h3>
              <div className="row">
                  <div className="input-parameters col-md-6">
                    <BoldLabel boldFor="Location" boldName="Location" />
                    <InputField
                      inptype="text"
                      inpid="location"
                      
                      
                      inpcontrol="location"
                    />
                  </div>
                  <div className="input-parameters col-md-6">
                    <BoldLabel
                      boldFor="Hour Rates"
                      boldName="Hour Rates"
                    />
                    <InputField
                      inptype="text"
                      inpid="hourRates"
                      inpname="hourRates"
                      
                      inpcontrol
                    />
                  </div>
                  <div className="input-parameters col-md-6">
                    <BoldLabel boldFor="Gross Weekly" boldName="Gross Weekly" />
                    <InputField
                      inptype="text"
                      inpid="grossWeekly"
                      inpname="grossWeekly"
                      
                      inpcontrol
                    />
                  </div>
                  <div className="input-parameters col-md-6">
                    <BoldLabel boldFor="Non-Tax Rates" boldName="Non-Tax Rates" />
                    <InputField
                      inptype="text"
                      inpid="nonTax"
                      inpname="nonTax"
                      
                      inpcontrol
                    />
                  </div>

                  

                  <div className="input-parameters col-md-6">
                    <BoldLabel boldFor="Taxable Rates" boldName="Taxable Rates" />
                    <InputField
                      inptype="text"
                      inpid="taxRates"
                      inpname="taxRates"
                      
                      inpcontrol
                    />
                  </div>

                  <div className="input-parameters col-md-6">
                    <BoldLabel boldFor="Guaranteed Hours" boldName="Guaranteed Hours" />
                    <InputField
                      inptype="text"
                      inpid="guarnhrs"
                      inpname="guarnhrs"
                      
                      inpcontrol
                    />
                  </div>
                </div>


              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

    </>
  );
};

export default BillCalculate;
