"use client";
import SearchBar from "@/components/SearchBar/SearchBar";
import { Grid2 } from "@mui/material";
import dynamic from "next/dynamic";
import { useState } from "react";

const FormComponent = dynamic(() => import("../../components/form/form"), {
  ssr: false,
});

export default function Search() {
  const [showForm, setShowForm] = useState(true);
  const [studentData, setStudentData] = useState({
    studentID: "",
    name: "",
    email: "",
    phoneNumber: "",
    nric: "",
    walletAddress: "",
    homeAddress: "",
    faculty: "",
    course: "",
    race: "",
    gender: "",
    nationality: "",
  });

  return (
    <Grid2
      width={"100%"}
      height={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {showForm ? (
        <FormComponent />
      ) : (
        <Grid2
          sx={{
            width: "100%",
            height: "fit-content",
            maxWidth: "768px",
            padding: "20px",
            borderRadius: "20px",
            background: "white",
            overflowY: "scroll",
            boxShadow:
              "rgba(50, 50, 93, 0.65) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.39) 0px 18px 36px -18px inset",
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
              marginTop: "12px",
              marginBottom: "12px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(115, 114, 114, 0.77)",
              borderRadius: "50px",
            },
          }}
        >
          <SearchBar
            setShowForm={setShowForm}
            showForm={showForm}
            studentData={studentData}
            setStudentData={setStudentData}
          />
        </Grid2>
      )}
    </Grid2>
  );
}
