"use client";
import { Button, Grid2, TextField } from "@mui/material";
import { getStudent } from "hooks/GunDB";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setStudent } from "../../../redux/actions/student_action";

export default function SearchBar(props) {
  const { showForm, setShowForm } = props;

  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");

  const onChange = (e) => {
    setSearchQuery(e?.target?.value);
  };

  const onSubmit = async() => {
    const data = await getStudent(searchQuery);
    console.log("data", data);
    if (!data) {
      return;
    }
    
    dispatch(setStudent(data));
    setShowForm(true);
  };

  return (
    <Grid2
      display={"flex"}
      width={"100%"}
      height={"100%"}
      gap={"20px"}
      sx={{ backgroud: "white" }}
    >
      <TextField
        sx={{
          width: "100%",
          maxWidth: "768px",
          "& .MuiInputBase-root": {
            borderRadius: "24px",
          },
        }}
        label="Wallet Address"
        value={searchQuery}
        onChange={onChange}
      />
      <Button
        sx={{
          width: "20%",
          textWrap: "nowrap",
          boxShadow: "0px 6px 40px -8px rgb(158, 158, 158)",
          textTransform: "none",
          color: "black",
          borderRadius: "24px",

          ":hover": {
            boxShadow: "0px 6px 44px -16px rgb(173, 172, 172) inset",
          },
        }}
        onClick={onSubmit}
      >
        Search
      </Button>
    </Grid2>
  );
}
