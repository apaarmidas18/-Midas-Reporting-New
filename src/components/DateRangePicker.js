import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the default CSS

const DateRangePicker = (props) => {
  const { startDate, setStartDate, endDate, setEndDate, handleFilterChange } =
    props;
  const handleStartDateChange = (date) => {
    setStartDate(date);
    handleFilterChange(date, "startDate");
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    handleFilterChange(date, "endDate");
  };

  return (
    <div className="container">
      <div className="date-range-picker row">
        <div className="col-md-4 job-select">
          <label>Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Select Start Date"
          />
        </div>
        <div className="col-md-4 job-select">
          <label>End Date</label>
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="Select End Date"
          />
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
