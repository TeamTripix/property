import Container from "@mui/material/Container";
import React, { useState, useEffect } from "react";
import { Button, DialogActions, TextField } from "@mui/material";
import Navbar from "../Navbar";
import axios from "axios";
import Alert from "../Alert";
import { useNavigate } from "react-router-dom";

function Index() {
  const navigate = useNavigate();
  const [responseData, setResponseData] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showAlert, setShowAlert] = useState({
    status: false,
    message: "",
    behaviour: "",
  });
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
    setShowAlert({status:false})
    axios({
      method: "put",
      url: "https://api-dev.contrax.com.au/api/v1/me/",
      data: { phone: phoneNumber },
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(function (res) {
      if (res.status === 200) {
        setShowAlert({
          status: true,
          message: "Contact no. changed",
          behaviour: "success",
        });
      } else {
        setShowAlert({
          status: true,
          message: "Network error",
          behaviour: "error",
        });
      }
    });
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
                variant="outlined"
                required={true}
                value={responseData.firm_name}
              />

              <TextField
                sx={margin}
                fullWidth
                label="First name"
                variant="outlined"
                required={true}
                value={responseData.first_name}
              />

              <TextField
                sx={margin}
                fullWidth
                label="Last name"
                variant="outlined"
                required={true}
                value={responseData.last_name}
              />

              <TextField
                sx={margin}
                fullWidth
                label="Email"
                variant="outlined"
                required={true}
                value={responseData.email}
              />

              <TextField
                sx={margin}
                fullWidth
                label="Phone number"
                variant="outlined"
                required={true}
                value={phoneNumber}
                onChange={handleChange}
              />
            </div>
            <DialogActions style={{ padding: 0 }}>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => {
                  navigate("/Dashboard");
                }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                type="submit"
                style={{ backgroundColor: "#14B8A6" }}
              >
                Save
              </Button>
            </DialogActions>
          </form>
        </Container>
      )}
      {showAlert.status ? (
        <Alert behaviour={showAlert.behaviour} message={showAlert.message} />
      ) : (
        ""
      )}
    </>
  );
}

export default Index;
