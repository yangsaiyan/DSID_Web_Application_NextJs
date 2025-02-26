"use client";

import Navbar from "@/components/navbar/Navbar";
import { Grid2 } from "@mui/material";
import dynamic from "next/dynamic";

const FormComponent = dynamic(() => import("../../components/form/form"));

export default function PushEmail() {
  return (
    <Grid2
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <Grid2
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FormComponent />
      </Grid2>
    </Grid2>
  );
}
