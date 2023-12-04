import React from "react";
import { Box, Grid } from "@mui/material";

const GridColumn = ({ children, min = 12, max = 4 }) => {
  return (
    <Grid item xs={min} lg={max}>
      <Box
        sx={{
          boxShadow: 2,
          borderRadius: "5px",
          padding: "1rem",
          marginBottom: "1.3rem",
        }}
      >
        {children}
      </Box>
    </Grid>
  );
};

export default GridColumn;
