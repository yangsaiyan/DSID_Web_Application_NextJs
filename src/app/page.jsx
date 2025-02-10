"use client";
import { Grid2, Typography } from "@mui/material";
import { StyledLottie } from "./styles";

export default function page() {

    return (
      <Grid2 style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <StyledLottie animationData={require("../../public/assets/lotties/StudentIdAnimation.json")} />
        <Typography variant="h4" sx={{ fontFamily: "cursive", textAlign: "center" }}>Secure, Smart, and Decentralized – Your Student ID, Reimagined.</Typography>
      </Grid2>
    );
  }