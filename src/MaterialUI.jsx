import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ResponsiveGrid() {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={2} lg={3}>
          <Item>sami</Item>
        </Grid>
        <Grid item sm={12} md={2} lg={3}>
          <Item>sami</Item>
        </Grid>
        <Grid item sm={12} md={6} lg={3}>
          <Item>sami</Item>
        </Grid>
        <Grid item sm={12} md={2} lg={3}>
          <Item>sami</Item>
        </Grid>
      </Grid>
    </Container>
  );
}
