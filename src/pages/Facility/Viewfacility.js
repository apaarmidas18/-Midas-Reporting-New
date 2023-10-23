import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { AiOutlinePlus } from "react-icons/ai";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import GetAllFacility from "../../API/Master/Facitlity/GetAllFacility";
import moment from "moment";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Button from "../../components/atoms/Button";
const Viewfacility = () => {
  const [facilityData, setFacilityData] = useState([]);
  const [loading, setLoading] = useState("");

  const navigate = useNavigate();
  var rows = [];

  useEffect(() => {
    GetAllFacility({ setFacilityData, setLoading });
  }, []);

  /* ------------------------------------------Adding Elements To Array-------------------------------- */
  for (let index = 0; index < facilityData.length; index++) {
    const element = facilityData[index];

    rows.push({
      ...element,
      sno: index + 1,
      createDate: moment(element.createDate).format("MM/DD/YYYY"),
      edit: (
        <Link
          type="button"
          class="edit-btn"
          state={{ data: element }}
          to={"/dashboard/edit-facility"}
        >
          <i class="fa fa-pencil"></i>
        </Link>
      ),
    });
  }
  /* ------------------------------------------Adding Elements To Array-------------------------------- */

  const data = {
    columns: [
      {
        label: "S.No",
        field: "sno",
        sort: "asc",
        width: 150,
      },
      {
        label: "Name",
        field: "name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Client Name",
        field: "clientName",
        sort: "asc",
        width: 270,
      },
      {
        label: "Address",
        field: "address",
        sort: "asc",
        width: 200,
      },
      {
        label: "Create Date",
        field: "createDate",
        sort: "asc",
        width: 100,
      },
      {
        label: "Edit",
        field: "edit",
        sort: "asc",
        width: 100,
      },
    ],
    rows: rows,
  };
  return (
    <>
      <div className="container-fluid ">
        <div className="heading">
          <HeaderBreadcrumbs
            meta={"Facility"}
            main={"List"}
            heading={"Facility List"}
          />
          <div className="button-group">
            <Button
              btnlogo={<AiOutlinePlus size={20} />}
              btnclass="export-btn"
              btnOnClick={() => navigate("/dashboard/add-facility")}
              btnTitle="New Client"
            />
          </div>
        </div>
      </div>
      <div className="container-fluid round-border bg-white mt-4 p-2 px-4">
        <MDBDataTable striped bordered hover sorting={true} small data={data} />
      </div>
    </>
  );
};

export default Viewfacility;
