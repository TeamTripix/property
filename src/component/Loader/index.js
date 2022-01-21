import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Index(props) {
  return (
    <Box sx={{ display: "flex" , justifyContent:'center', alignItems:'center' }}>
      <CircularProgress sx={{color:props.color}} size={27} />
    </Box>
  );
}
