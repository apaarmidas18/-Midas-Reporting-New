import { filter } from "lodash";

export function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query.city !== "") {
    if (query) {
      return filter(
        array,
        (_jobs) =>
          _jobs.City.toLowerCase().indexOf(query.city.toLowerCase()) !== -1
      );
    }
    return stabilizedThis.map((el) => el[0]);
  } else if (query.States !== "") {
    if (query) {
      return filter(
        array,
        (_jobs) =>
          _jobs.State.toLowerCase().indexOf(query.States.toLowerCase()) !== -1
      );
    }
  } else if (query.Profession !== "") {
    if (query) {
      return filter(
        array,
        (_jobs) =>
          _jobs.Degree.toLowerCase().indexOf(query.Profession.toLowerCase()) !==
          -1
      );
    }
  } else if (query.Speciality !== "") {
    if (query) {
      return filter(
        array,
        (_jobs) =>
          _jobs.JobSpecialty.toLowerCase().indexOf(
            query.Speciality.toLowerCase()
          ) !== -1
      );
    }
  } else if (query.startDate !== "" && query.endDate !== "") {
    if (query) {
      return filter(
        array,
        (_jobs) =>
          _jobs.FormattedStartDate >= query.endDate &&
          _jobs.FormattedEndDate <= query.startDate !== -1
      );
    }
  } else if (query.VMS !== "") {
    console.log("inquery");
    if (query) {
      return filter(
        array,
        (_jobs) =>
          _jobs.SourceName.toLowerCase().indexOf(query.VMS.toLowerCase()) !== -1
      );
    }
    {
      if (query) {
        return filter(
          array,
          (_jobs) =>
            _jobs.Facility.toLowerCase().indexOf(
              query.clientName.toLowerCase()
            ) !== -1
        );
      }
    }
  }
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
export function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
