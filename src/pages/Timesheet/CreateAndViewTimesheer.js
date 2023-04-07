import React from "react";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import GetAllClients from "../../API/Master/Client/GetAllClients";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import CreateTimeSheet from "../../API/Timesheet/CreateTimeSheet";
import GetTimeSheetByPId from "../../API/Timesheet/GetTimeSheetByPId";
import moment from "moment";

const Timesheet = () => {
  const userData = localStorage.getItem("User");
  const [viewTimeSheetTable, setViewTimeSheetTable] = useState([]);

  const location = useLocation();
  const { data } = location.state;
  const [clientDetails, setClientDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [day, setDay] = useState(new Date().getDay());
  const [dataa, setData] = useState([]);

  const currentDate = moment().format("DD/MM/YYYY");
  const WEEKDAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday",
  ];
  const [inputList, setInputList] = useState([
    {
      projectId: data.projectId,
      projectDbId: data.id,
      employeeId: data.employeId,
      day: WEEKDAYS[day],
      date: currentDate,
      regularHours: "",
      breakHours: "",
      overTimeHours: "",
      holidayHours: "",
    },
  ]);

  //validation******************************************************************

  //   const formik = useFormik({
  //     initialValues: {
  //       day: "",
  //       date: "",
  //       regularHours: "",
  //       breakHours: "",
  //       overTimeHours: "",
  //       holidayHours: "",
  //     },
  //     validationSchema: Yup.object({
  //       day: Yup.string().required("Required"),
  //       date: Yup.string().required("Required"),
  //       regularHours: Yup.string().required("Required"),
  //       breakHours: Yup.string().required("Required"),
  //       overTimeHours: Yup.string().required("Required"),
  //       holidayHours: Yup.string().required("Required"),
  //     }),
  //     onSubmit: (values) => {
  //       CreateTimeSheet(values, navigate);
  //       alert(JSON.stringify(values, null, 2));
  //       // setFormState(values);
  //     },
  //   });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
    setData(list[index]);
  };

  const handleDateChange = (e, index) => {
    const FDate = moment(inputList[index].date, "DD/MM/YYYY").format(
      "DD/MM/YYYY"
    );
    var FormatDate = moment(FDate, "DD/MM/YYYY").format(
      "MMMM DD, YYYY h:mm:ss"
    );
    const d = new Date(FormatDate);
    let day = d.getDay();
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = WEEKDAYS[day];
    setInputList(list);
    setData(list[index]);
  };

  const pageRelod = () => {
    window.location.reload();
  };
  const selectedDate = new Date();

  const GetMonth = moment(selectedDate).format("/MM/YYYY");

  const month = GetMonth.split("/")[1];

  const year = GetMonth.split("/")[2];

  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  const handleAddClick = (index) => {
    const FDate = moment(inputList[index].date, "DD/MM/YYYY").format(
      "DD/MM/YYYY"
    );

    var FormatDate = moment(FDate, "DD/MM/YYYY").format(
      "MMMM DD, YYYY h:mm:ss"
    );

    const date = new Date(FormatDate);

    var AdditionDate = date.getDate();

    let tomorrow = new Date(FormatDate);

    tomorrow.setDate(date.getDate() + 1);

    var daysOfMonth = daysInMonth(month, year);

    if (AdditionDate > daysOfMonth) {
      CreateTimeSheet(dataa);

      pageRelod();
    } else {
      let stringDate =
        tomorrow.getDate() +
        "/" +
        (parseInt(tomorrow.getMonth()) + parseInt(1)) +
        "/" +
        tomorrow.getFullYear();

      setInputList([
        ...inputList,
        {
          projectId: data.projectId,
          projectDbId: data.id,
          employeeId: data.employeId,
          date: stringDate,
          day: WEEKDAYS[tomorrow.getDay()],
          regularHours: 0,
          breakHours: 0,
          overTimeHours: "",
          holidayHours: "",
        },
      ]);

      CreateTimeSheet(dataa);
    }
  };

  const PId = data.id;
  useEffect(() => {
    GetAllClients({ setClientDetails, setLoading });
    // GetAllVMSs({ setVMSDetails, setLoading });
    GetTimeSheetByPId({ setViewTimeSheetTable, setLoading, PId });
  }, []);
  //validation**************************************************************************

  //table *********************************************************************

  var rows = [];

  for (let index = 0; index < viewTimeSheetTable.length; index++) {
    const element = viewTimeSheetTable[index];

    rows.push({
      ...element,
      action: (
        <Link
          type="button"
          class="edit-btn"
          state={{ data: element }}
          to={"/dashboard/edit-timesheet"}
        >
          <i class="fa fa-pencil"></i>
        </Link>
      ),
    });
  }
  /* ------------------------------------------Adding Elements To Array-------------------------------- */

  const dataT = {
    columns: [
      {
        label: "S.No",
        field: "id",
        sort: "asc",
        width: 150,
      },
      {
        label: "Day",
        field: "day",
        sort: "asc",
        width: 150,
      },
      {
        label: "Date",
        field: "date",
        sort: "asc",
        width: 150,
      },

      {
        label: "Regular-Hours",
        field: "regularHours",
        sort: "asc",
        width: 200,
      },
      {
        label: "Break-Hours",
        field: "breakHours",
        sort: "asc",
        width: 100,
      },
      {
        label: "Over-Time Hours",
        field: "overTimeHours",
        sort: "asc",
        width: 150,
      },
      {
        label: "Project-ID",
        field: "projectId",
        sort: "asc",
        width: 150,
      },
      {
        label: "Project-Code",
        field: "projectDbId",
        sort: "asc",
        width: 100,
      },
      {
        label: "Action",
        field: "action",
        sort: "asc",
        width: 100,
      },
    ],
    rows: rows,
  };

  return (
    <>
      <div className="container-fluid">
        <div className="heading">
          <HeaderBreadcrumbs
            meta={"Timesheet"}
            main={"Timesheet"}
            heading={"Time sheet of employee"}
          />
        </div>
      </div>
      <div className="container-fluid round-border bg-white p-4 mt-4 rounded-2xl">
        <div className="row">
          {inputList.map((item, index) => {
            return (
              <>
                <div class="mb-3 col-md-2">
                  <label for="firstName" class="form-label">
                    Day
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="day"
                    aria-describedby="emailHelp"
                    controlId="day"
                    value={item.day}
                    onChange={(e) => handleChange(e, index)}
                    onClick={(e) => handleDateChange(e, index)}
                    name="day"
                  />
                </div>

                <div class="mb-3 col-md-2">
                  <label for="name" class="form-label">
                    Date
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    aria-describedby="emailHelp"
                    value={item.date}
                    onChange={(e) => handleChange(e, index)}
                    controlId="date"
                    name="date"
                  />
                </div>
                <div class="mb-3 col-md-2">
                  <label for="firstName" class="form-label">
                    Regular-Hours
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="regularHours"
                    aria-describedby="emailHelp"
                    value={item.regularHours}
                    onChange={(e) => handleChange(e, index)}
                    name="regularHours"
                    controlId="regularHours"
                  />
                </div>

                <div class="mb-3 col-md-2">
                  <label for="firstName" class="form-label">
                    Break-Hours
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="breakHours"
                    aria-describedby="emailHelp"
                    value={item.breakHours}
                    onChange={(e) => handleChange(e, index)}
                    name="breakHours"
                    controlId="breakHours"
                  />
                </div>

                <div class="mb-3 col-md-2">
                  <label for="name" class="form-label">
                    Over-Time Hours
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="overTimeHours"
                    aria-describedby="emailHelp"
                    value={item.overTimeHours}
                    onChange={(e) => handleChange(e, index)}
                    name="overTimeHours"
                    controlId="overTimeHours"
                  />
                </div>

                <div class="mb-3 col-md-2">
                  <label for="name" class="form-label">
                    Holiday Hours
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="holidayHours"
                    aria-describedby="emailHelp"
                    value={item.holidayHours}
                    onChange={(e) => handleChange(e, index)}
                    name="holidayHours"
                    controlId="holidayHours"
                  />
                </div>
                {inputList.length > 7 ? (
                  window.location.reload()
                ) : (
                  <button
                    type="submit"
                    class="btn btn-primary"
                    onClick={() => handleAddClick(index)}
                  >
                    Add
                  </button>
                )}
              </>
            );
          })}
        </div>
      </div>

      <div className="container-fluid round-border bg-white mt-4 p-2 px-4">
        <MDBDataTable
          striped
          bordered
          hover
          sorting={true}
          small
          data={dataT}
        />
      </div>
    </>
  );
};

export default Timesheet;
