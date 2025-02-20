"use client";
import { Grid2, Typography } from "@mui/material";
import animationData from "../../public/assets/lotties/blockchain.json";
import dynamic from "next/dynamic";
import Navbar from "./components/navbar/Navbar";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
});

export default function page() {
  return (
    <>
      <Navbar />
      <Grid2
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Lottie
          animationData={animationData}
          style={{
            width: "100%",
            height: "100%",
            maxWidth: "30%",
            maxHeight: "30%",
          }}
        />
        <Typography sx={{ fontFamily: "cursive", textAlign: "center" }}>
          Secure, Smart, and Decentralized – Your Student ID, Reimagined.
        </Typography>
      </Grid2>
    </>
  );
}
