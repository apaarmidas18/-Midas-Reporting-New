import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { HiOutlineDownload } from "react-icons/hi";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import GetAllProjects from "../../API/Project/GetAllProjects";
import { Link } from "react-router-dom";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import GetAllBlogs from "../../API/Blogs/GetAllBlogs";
import deleteBlogById from "../../API/Blogs/deleteBlogById";

const ViewBlogs = () => {
  const [blogs, setAllblogs] = useState([]);
  const [loading, setIsloading] = useState("");

  var rows = [];

  useEffect(() => {
    GetAllBlogs({ setAllblogs, setIsloading });
  }, []);
  const DeleteBlog = (blogID) => {
    deleteBlogById({ blogID });
  };
  /* ------------------------------------------Adding Elements To Array-------------------------------- */
  for (let index = 0; index < blogs.length; index++) {
    const element = blogs[index];

    rows.push({
      ...element,
      id: index + 1,
      status: element.status == "1" ? "Active" : "Inactive",
      edit: (
        <Link
          type="button"
          class="edit-btn"
          state={{ data: element }}
          to={"/dashboard/edit-project"}
        >
          <i class="fa fa-pencil"></i>
        </Link>
      ),
      action: (
        <Link
          type="button"
          class="btn btn-danger"
          style={{ padding: "7px 13px", height: "33px", borderRadius: "10px" }}
          state={{ data: element }}
          onClick={() => DeleteBlog(element._id)}
        >
          <i
            class="fa-solid fa-trash"
            style={{
              color: "white",
            }}
          ></i>
        </Link>
      ),
      //   timesheet: (
      //     <Link
      //       type="button"
      //       class="btn btn-success"
      //       style={{ padding: "7px 13px", height: "33px" }}
      //       to={"/dashboard/timesheet"}
      //       state={{ data: element }}
      //     >
      //       <i class="fa fa-eye" style={{ color: "white" }}></i>
      //     </Link>
      //   ),
    });
  }
  /* ------------------------------------------Adding Elements To Array-------------------------------- */

  const data = {
    columns: [
      {
        label: "S.No",
        field: "id",
        sort: "asc",
        width: 150,
      },
      {
        label: "Title",
        field: "title",
        sort: "asc",
        width: 150,
      },
      {
        label: "Description",
        field: "metaDescription",
        sort: "asc",
        width: 150,
      },
      {
        label: "Blog URL ",
        field: "url",
        sort: "asc",
        width: 150,
      },
      {
        label: "Status",
        field: "status",
        sort: "asc",
        width: 150,
      },
      {
        label: "Edit Blog",
        field: "edit",
        sort: "asc",
        width: 150,
      },
      {
        label: "Remove",
        field: "action",
        sort: "asc",
        width: 150,
      },
    ],
    rows: rows,
  };
  return (
    <>
      <div className="container-fluid ">
        <div className="heading">
          <HeaderBreadcrumbs
            meta={"Project"}
            main={"List"}
            heading={"Project List"}
          />
          <div className="button-group">
            <button className="export-btn" style={{ width: "120px" }}>
              <HiOutlineDownload size={22} />
              <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="export-list"
                table="project-list-table"
                filename="Project List"
                sheet="Project List"
                buttonText=" Export List"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="container-fluid round-border bg-white mt-4 p-2 px-4">
        <MDBDataTable
          id="project-list-table"
          striped
          bordered
          hover
          sorting={true}
          small
          data={data}
        />
      </div>
    </>
  );
};

export default ViewBlogs;
