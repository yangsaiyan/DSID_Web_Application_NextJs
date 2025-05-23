"use client";
import { Grid2 } from "@mui/material";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useAccount } from "wagmi";

const FormComponent = dynamic(() => import("../../components/form/form"), {
  ssr: false,
});

export default function PushEmail() {
  const account = useAccount();

  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    nric: "",
    email: "",
    faculty: "",
    course: "",
    race: "",
    gender: "",
    nationality: "",
    phoneNumber: "",
    permanentHomeAddress: "",
    walletAddress:  "",
  });

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
      <Grid2
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FormComponent account={account} formData={formData} setFormData={setFormData} />
      </Grid2>
    </Grid2>
  );
}
