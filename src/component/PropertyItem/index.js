import * as React from "react";
import noImage from "../../assets/image/no-image.png";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import HomeIcon from "@mui/icons-material/Home";

export default function Index(itemData) {
  const { street, city, state, country } = itemData.data.listing.address;

  return (
    <Card
      className="cardStyle"
      sx={{ display: "flex", margin: "20px 0px", backgroundColor: "#fcfcfc" }}
    >
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={
          itemData.data.listing.image ? itemData.data.listing.image : noImage
        }
        alt="Live from space album cover"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h6">
            {street} {city} {state} {country}
          </Typography>
          <Stack direction="row" spacing={1}>
            {itemData.data.assigned_to_me ? (
              <Chip
                size="small"
                icon={<HomeIcon style={{ color: "#14B8A6" }} />}
                label="Assigned to me"
                variant="outlined"
                sx={{ marginTop: "1rem", color: "#14B8A6" }}
              />
            ) : (
              ""
            )}
          </Stack>
        </CardContent>
      </Box>
    </Card>
  );
}
