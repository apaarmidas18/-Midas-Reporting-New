import React from "react";
import { Modal } from "react-bootstrap";

const JobModal = (props) => {
  const { open, handleClose, children, jobid, className } = props;
  console.log(jobid);
  return (
    <>
      <div className="job-modal-container">
        <Modal
          show={open}
          onHide={handleClose}
          contentClassName={className}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {jobid == 0
                ? "Assign a job"
                : typeof jobid == "string"
                ? jobid
                : "Job ID" - jobid}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container-fluid">{children}</div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default JobModal;
