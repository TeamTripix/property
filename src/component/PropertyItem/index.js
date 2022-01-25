import * as React from "react";
import noImage from "../../assets/image/no-image.png";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import HomeIcon from "@mui/icons-material/Home";

export default function Index(itemData) {
  const { street, city, state, country } = itemData.data.listing.address;

  const cardStyle = {
    display: "flex",
  };

  return (
    <Card
      className="cardStyle"
      sx={{
        display: "flex",
        margin: "20px 0px",
        backgroundColor: "#fcfcfc",
        minHeight: "7rem",
        maxHeight: "7rem",
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={
          itemData.data.listing.image ? itemData.data.listing.image : noImage
        }
        alt="Live from space album cover"
      />
      <CardContent sx={itemData.data.assigned_to_me ? "" : cardStyle}>
        <Typography component="div" variant="h6" sx={{ margin: "auto 0px" }}>
          {street} {city} {state} {country}
        </Typography>
        {itemData.data.assigned_to_me ? (
          <Stack direction="row" spacing={1}>
            <Chip
              size="small"
              icon={<HomeIcon style={{ color: "#14B8A6" }} />}
              label="Assigned to me"
              variant="outlined"
              sx={{ marginTop: "1rem", color: "#14B8A6" }}
            />
          </Stack>
        ) : (
          ""
        )}
      </CardContent>
    </Card>
  );
}
