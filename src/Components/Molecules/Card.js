import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function CardComponent({ children }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        {/* <CardMedia component="img" height="500" image="/" alt="green iguana" /> */}
        <CardContent>{children}</CardContent>
      </CardActionArea>
    </Card>
  );
}
