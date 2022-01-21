import { Container } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PropertyItem from "../PropertyItem";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardLoader from "../CardLoader";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Index() {
  const [value, setValue] = React.useState(0);
  const [responseData, setResponseData] = useState(null);
  useEffect(() => {
    let config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const url = "https://api-dev.contrax.com.au/api/v1/buying-contracts/";
    axios.get(url, config).then((response) => {
      setResponseData(response.data);
    });
  }, [setResponseData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", marginTop: "64px" }}>
      <Box
        className="backdrop-blur"
        sx={{
          width: "100%",
          borderBottom: 1,
          borderColor: "divider",
          position: "fixed",
        }}
      >
        <Tabs value={value} onChange={handleChange} aria-label="cards Tab">
          <Tab label="Buying" {...a11yProps(0)} />
          <Tab label="Selling" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {/* Buying Card */}
        <Container fixed sx={{ marginTop: "100px" }}>
          <Box>
            {responseData === null ? (
              <CardLoader />
            ) : (
              responseData.buying.map((item) => {
                return <PropertyItem data={item} />;
              })
            )}
          </Box>
        </Container>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* selling card */}
        <Container fixed sx={{ marginTop: "100px" }}>
          <Box>
            {responseData === null ? (
              <CardLoader />
            ) : (
              responseData.selling.map((item) => {
                return <PropertyItem data={item} />;
              })
            )}
          </Box>
        </Container>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}
