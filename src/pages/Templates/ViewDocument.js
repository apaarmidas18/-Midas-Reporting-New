import React, { useEffect, useState, useRef } from "react";
import Collapsible from "react-collapsible";
import GetAllFields from "../../API/Zoho-API/GetAllFields";
import GetViewDocuments from "../../API/Zoho-API/GetViewDocuments";
import { useLocation } from "react-router";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import GetDocumentByReqAndDocID from "../../API/Zoho-API/GetDocumentByReqAndDocID";
import { Draggable, Droppable } from "react-drag-and-drop";
const ViewDocument = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [fieldDetails, setFieldDetails] = useState([]);
  const [documentDetail, setDocumentDetail] = useState([]);
  const [viewDocData, setViewDocData] = useState([]);
  const [getDoc, setGetDoc] = useState("");
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [inputType, setInputType] = useState("");

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const rid = "40051000000266365";
  const docId = "40051000000266351";

  useEffect(() => {
    GetAllFields({ setFieldDetails, setLoading });
    GetViewDocuments({ setDocumentDetail, setLoading });
    GetDocumentByReqAndDocID({ rid, docId, setGetDoc });
  }, []);

  const onDrop = (data) => {
    console.log(data);

    setInputType();
  };
  return (
    <>
      <div className="container-fluid view-document">
        <div className="row">
          <div className="col-md-2 document-list">
            <h5>Documents</h5>
            <Collapsible
              trigger={[
                <span className="trig-span">Document</span>,
                <i class="fa-solid fa-chevron-right"></i>,
              ]}
            >
              {documentDetail.document_ids === undefined ? (
                "Wait"
              ) : (
                <>
                  {documentDetail.document_ids.map((item, index) =>
                    item.pages.map((ite, index) => {
                      return (
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => setViewDocData(ite)}
                        >
                          <img
                            src={`data:image/jpg;base64,${ite.image_string}`}
                          />
                        </div>
                      );
                    })
                  )}
                </>
              )}
            </Collapsible>
            <hr />
          </div>
          <div className="col-md-7 ">
            <div>
              <Droppable onDrop={onDrop}>
                <Document
                  file="/downloaded.pdf"
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <Page pageNumber={pageNumber} />
                  <input type="" />
                </Document>
                <p>
                  Page {pageNumber} of {numPages}
                </p>
              </Droppable>
            </div>
          </div>
          <div className="col-md-3 drag-info">
            <div className=" reciept-email">
              <h6 className="header-head">Recipients</h6>
              <span>anubhav@gmail.com</span>
            </div>
            <div className="drag-field">
              <h6 className="header-head">Fields</h6>
              <div className="drag-btn-container">
                {fieldDetails.map((item, index) => {
                  console.log(item);
                  return (
                    <Draggable key={index}>
                      <button className="drag-btn">
                        <i
                          style={{ color: "#1da586" }}
                          class="fa-solid fa-grip-vertical"
                        ></i>
                        {item.field_type_name}
                      </button>
                    </Draggable>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewDocument;
