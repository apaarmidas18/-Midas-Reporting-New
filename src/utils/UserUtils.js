import React from "react";
export const conditionalRowData = ({ rows, userdata }) => {
  console.log(userdata);
  for (let index = 0; index < userdata.length; index++) {
    const element = userdata[index];
    rows.push({
      ...element,
      status:
        element.status == 1
          ? "Active"
          : element.status == 2
          ? "Inactive"
          : element.status,
      rollId:
        element.rollId == 1
          ? "Super-Admin"
          : element.rollId == 2
          ? "Admin"
          : element.rollId == 3
          ? "Moderator"
          : element.rollId == 4
          ? "On-Boarding"
          : element.rollId == 5
          ? "Team-Lead"
          : element.rollId == 6
          ? "Recruiter"
          : element.rollId,
      type:
        element.type == 1
          ? "Internal"
          : element.type == 2
          ? "External"
          : element.type,
      action: (
        <button type="button" class="edit-btn">
          <i class="fa fa-pencil"></i>
        </button>
      ),
    });
  }
};
