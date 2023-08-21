import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
const SubHorizontal = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
  const listItems = [
    { tabname: "Dashboard", tabroute: "" },
    { tabname: "Active", tabroute: "/portal/active-candidates" },
    { tabname: "Booked", tabroute: "booked-candidates" },
    { tabname: "Extension", tabroute: "extension-candidates" },
    { tabname: "Pending", tabroute: "pending-candidates" },
    { tabname: "Prospect", tabroute: "" },
    { tabname: "Availability Log", tabroute: "availability-log" },
    { tabname: "Submittals", tabroute: "" },
    { tabname: "Hot List", tabroute: "" },
    { tabname: "Watch List", tabroute: "" },
    { tabname: "Perm Candidates", tabroute: "" },
    { tabname: "Plan My Day", tabroute: "" },
  ];
  const highlightedItemClass = "light-active";

  return (
    <>
      <nav className="light-navbar">
        <ul className="light-nav-list d-flex">
          {listItems.map((item, index) => {
            return (
              <li key={index} onClick={() => handleItemClick(item.tabname)}>
                <span
                  className={
                    selectedItem === item.tabname ? highlightedItemClass : ""
                  }
                >
                  <Link to={item.tabroute}>{item.tabname}</Link>
                </span>
              </li>
            );
          })}
          {/* <li className="light-navitem">
            <Link href="light-link">
              <span class="light-title">Dashboard</span>
            </Link>
          </li>
          <li className="light-navitem">
            <Link href="light-link">
              <span class="light-title">Active</span>
            </Link>
          </li>
          <li className="light-navitem">
            <Link href="light-link">
              <span class="light-title">Booked</span>
            </Link>
          </li>
          <li className="light-navitem">
            <Link href="light-link">
              <span class="light-title">Extension</span>
            </Link>
          </li>
          <li className="light-navitem">
            <Link href="light-link">
              <span class="light-title">Pending</span>
            </Link>
          </li>
          <li className="light-navitem">
            <Link href="light-link">
              <span class="light-title">Prospect</span>
            </Link>
          </li>
          <li className="light-navitem">
            <Link href="light-link">
              <span class="light-title">Availability Log</span>
            </Link>
          </li>
          <li className="light-navitem">
            <Link href="light-link">
              <span class="light-title">Submittals</span>
            </Link>
          </li>
          <li className="light-navitem">
            <Link href="light-link">
              <span class="light-title">Hot List</span>
            </Link>
          </li>
          <li className="light-navitem">
            <Link href="light-link">
              <span class="light-title">Watch List</span>
            </Link>
          </li>
          <li className="light-navitem">
            <Link href="light-link">
              <span class="light-title">Perm Candidates</span>
            </Link>
          </li>
          <li className="light-navitem">
            <Link href="light-link">
              <span class="light-title">Plan My Day</span>
            </Link>
          </li> */}
        </ul>
      </nav>
    </>
  );
};

export default SubHorizontal;
