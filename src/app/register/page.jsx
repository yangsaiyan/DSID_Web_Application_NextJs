"use client";
import { Grid2 } from "@mui/material";
import FormComponent from "../../app/components/form/form";
import Navbar from "../components/navbar/Navbar";

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
