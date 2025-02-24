"use client";
import { Grid2 } from "@mui/material";
import Navbar from "../components/navbar/Navbar";
import dynamic from "next/dynamic";

const FormComponent = dynamic(() => import("../../app/components/form/form"), {
  ssr: false,
});

export default function page() {

  return (
    <>
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
    </>
  );
}
