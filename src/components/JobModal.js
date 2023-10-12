import React from 'react'
import { Modal } from 'react-bootstrap';

const JobModal = (props) => {
    const  {open,  handleClose, children, jobid} = props
  return (
    <>
      <div className="job-modal-container">
            <Modal
              show={open}
              onHide={handleClose}
              contentClassName="job-modal"
              size="lg"
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  Job Details{" "}
                  <span>(Job ID - {jobid})</span>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="container-fluid">
                {children}
                </div>
              </Modal.Body>
            </Modal>

          </div>
    </>
  )
}

export default JobModal