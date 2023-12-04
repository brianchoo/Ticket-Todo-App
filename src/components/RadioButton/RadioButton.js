import React from "react";
import { Radio, FormControlLabel } from "@mui/material";

const RadioButton = ({ value, label, onChangeHandler, priority }) => (
  <FormControlLabel
    value={value}
    control={<Radio />}
    label={label}
    checked={priority}
    onChange={onChangeHandler}
  />
);

export default RadioButton;
