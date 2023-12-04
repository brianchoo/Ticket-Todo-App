import React from "react";
import { TextField } from "@mui/material";

const TextInput = ({ label, inputHandler, valueName }) => {
  return (
    <TextField
      fullWidth={true}
      label={label}
      variant="outlined"
      onInput={inputHandler}
      size="small"
      sx={{ marginBottom: "1rem" }}
      value={valueName}
      autoComplete="off"
    />
  );
};

export default TextInput;
