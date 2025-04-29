"use client";
import { Grid2, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Loading = dynamic(() => import("../components/loading/loading"), { ssr: false });

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function page() {
  const [animationData, setAnimationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    import("../../public/assets/lotties/blockchain.json")
      .then((data) => {
        setAnimationData(data.default || data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load animation:", err);
        setIsLoading(false);
      });
  }, []);

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
          <Lottie
            animationData={animationData}
            style={{
              width: "calc(100vh/2)",
              height: "calc(100vh/2)",
            }}
          />
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
