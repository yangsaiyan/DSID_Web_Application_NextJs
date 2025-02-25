"use client";
import { Grid2 } from "@mui/material";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("../../components/navbar/Navbar"), {
  ssr: false,
});

const FormComponent = dynamic(() => import("../../components/form/form"), {
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
