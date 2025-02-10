"use client";
import { Grid2, Typography } from "@mui/material";
import StyledLottie from "../app/components/LottiePlayer/Lottie";
import animationData from "../../public/assets/lotties/StudentIdAnimation.json";

export default function page() {
  return (
    <Grid2
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StyledLottie animationData={animationData} />
      <Typography
        variant="h4"
        sx={{ fontFamily: "cursive", textAlign: "center" }}
      >
        Secure, Smart, and Decentralized – Your Student ID, Reimagined.
      </Typography>
    </Grid2>
  );
}
