import * as React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

function Media() {
  return (
    <Grid container sx={{ margin: "10px 0px" }}>
      <Skeleton variant="rectangular" width={200} height={118} />

      <Box
        sx={{ display: "flex", justifyContent: "center", marginLeft: "10px" }}
      >
        <Skeleton sx={{ width: "73vw" }} />
        <Skeleton />
      </Box>
    </Grid>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function Index() {
  return (
    <Box sx={{ overflow: "hidden" }}>
      <Media loading />
      <Media loading />
      <Media loading />
    </Box>
  );
}
