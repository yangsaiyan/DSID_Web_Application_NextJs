"use client";
import { Grid2 } from "@mui/material";
import html2canvas from "html2canvas";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAccount } from "wagmi";

const FormComponent = dynamic(() => import("../../components/form/form"), {
  ssr: false,
});

const StudenIDComponent = dynamic(
  () => import("../../components/studentId/studentId"),
  {
    ssr: false,
  }
);

export default function page() {
  const account = useAccount();
  const studentData = useSelector((state) => state.student);

  const generateImage = async () => {
    html2canvas(document.getElementById("studentID"), {
      backgroundColor: null,
      scale: 2,
    }).then((canvas) => {
      const link = document.createElement("a");
      link.download = "student-id.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };

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
        <FormComponent generateImage={generateImage} account={account} />
        <StudenIDComponent
          address={account?.address}
          studentId={studentData?.studentId}
          faculty={studentData?.faculty}
          course={studentData?.course}
        />
      </Grid2>
    </Grid2>
  );
}
