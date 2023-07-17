import React from "react";
import { Link } from "react-router-dom";
const SubHorizontal = () => {
  return (
    <>
      <nav className="light-navbar">
        <div className="container">
          <ul>
            <li className="light-navitem">
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
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default SubHorizontal;
