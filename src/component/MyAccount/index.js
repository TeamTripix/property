import Container from "@mui/material/Container";
import React, { useState, useEffect } from "react";
import { Button, DialogActions, TextField } from "@mui/material";
import Navbar from "../Navbar";
import axios from "axios";
// import Link from "react-router-dom"
import { useNavigate } from "react-router-dom";

function Index() {
  const navigate = useNavigate();

  const [responseData, setResponseData] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  useEffect(() => {
    let config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const url = "https://api-dev.contrax.com.au/api/v1/me/";
    axios.get(url, config).then((response) => {
      setResponseData(response.data);
      setPhoneNumber(response.data.phone);
    });
  }, [setResponseData]);

  const handleChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "put",
      url: "https://api-dev.contrax.com.au/api/v1/me/",
      data: { phone: phoneNumber },
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(function () {});
  };
  const margin = {
    marginTop: "10px",
    marginBottom: "10px",
  };
  return (
    <>
      <Navbar />
      {responseData === null ? (
        "loading"
      ) : (
        <Container
          sx={{
            minHeight: "100vh",
            minWidth: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <form style={{ width: "80%" }} onSubmit={handleSubmit}>
            <div>
              <TextField
                sx={margin}
                fullWidth
                label="Firm name"
                // style={{ marginRight: "0.625rem" }}
                variant="outlined"
                required={true}
                value={responseData.firm_name}
              />

              <TextField
                sx={margin}
                fullWidth
                label="First name"
                // style={{ marginRight: "0.625rem" }}
                variant="outlined"
                required={true}
                value={responseData.first_name}
              />

              <TextField
                sx={margin}
                fullWidth
                label="Last name"
                // style={{ marginRight: "0.625rem" }}
                variant="outlined"
                required={true}
                value={responseData.last_name}
              />

              <TextField
                sx={margin}
                fullWidth
                label="Email"
                // style={{ marginRight: "0.625rem" }}
                variant="outlined"
                required={true}
                value={responseData.email}
              />

              <TextField
                sx={margin}
                fullWidth
                label="Phone number"
                // style={{ marginRight: "0.625rem" }}
                variant="outlined"
                required={true}
                value={phoneNumber}
                onChange={handleChange}
              />
            </div>
            <DialogActions style={{ padding: 0 }}>
              <Button
                // to="/Dashboard"
                variant="contained"
                color="inherit"
                // style={{ backgroundColor: "#14B8A6" }}
                onClick={() => {
                  navigate("/Dashboard");
                }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                //   color="primary"
                type="submit"
                style={{ backgroundColor: "#14B8A6" }}
              >
                Save
              </Button>
            </DialogActions>
          </form>
        </Container>
      )}
    </>
  );
}

export default Index;
