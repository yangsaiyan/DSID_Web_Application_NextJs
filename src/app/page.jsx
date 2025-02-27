"use client";
import { Grid2, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Loading from "../components/loading/loading";
import dynamic from "next/dynamic";

// const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function page() {
  const [animationData, setAnimationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   import("../../public/assets/lotties/blockchain.json")
  //     .then((data) => {
  //       setAnimationData(data.default || data);
  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error("Failed to load animation:", err);
  //       setIsLoading(false);
  //     });
  // }, []);

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
      {isLoading ? (
        <Loading />
      ) : (
        <Grid2
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          {/* <Lottie
            animationData={animationData}
            style={{
              width: "100%",
              height: "100%",
              maxWidth: "70%",
              maxHeight: "70%",
            }}
          /> */}
          <Typography
            sx={{ fontFamily: "cursive", textAlign: "center", color: "white" }}
          >
            Secure, Smart, and Decentralized – Your Student ID, Reimagined.
          </Typography>
        </Grid2>
      )}
    </Grid2>
  );
}
