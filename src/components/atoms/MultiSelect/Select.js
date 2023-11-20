import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import active_vms from "../../../utils/active_vms";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};

export default function MultipleSelectCheckmarks(setVMS) {
 
  return (
    <div>
      <FormControl sx={{ mt: 3, width: 350 }}>
        <InputLabel size={"small"} id="demo-multiple-checkbox-label">
          VMS
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={vmsName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
          sx={{ height: 40 }}
        >
          {active_vms.map((name) => (
            <MenuItem key={name.value} value={name.value}>
              <Checkbox checked={vmsName.indexOf(name.value) > -1} />
              <ListItemText primary={name.value} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
