"use client";
import { Grid2, Typography } from "@mui/material";
import animationData from "../../public/assets/lotties/blockchain.json";
import dynamic from "next/dynamic";
import Navbar from "../components/navbar/Navbar";
import React, { Suspense, useState } from "react";
import Loading from "@/components/loading/loading";

const Lottie = React.lazy(() => import("lottie-react"), {
  ssr: false,
});

export default function page() {
  return (
    <Grid2
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Suspense fallback={<Loading />}>
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
              maxWidth: "60%",
              maxHeight: "60%",
            }}
          />
          <Typography sx={{ fontFamily: "cursive", textAlign: "center" }}>
            Secure, Smart, and Decentralized – Your Student ID, Reimagined.
          </Typography>
        </Grid2>
      </Suspense>
    </Grid2>
  );
}
