"use client";
import { Button, Grid2, TextField } from "@mui/material";
import { getStudent } from "hooks/GunDB";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setStudent } from "../../../redux/actions/student_action";

export default function SearchBar() {

  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");

  const onChange = (e) => {
    setSearchQuery(e?.target?.value);
  };

  const onSubmit = async () => {
    const data = await getStudent(searchQuery);
    console.log("data", data);
    if (!data) {
      return;
    }

    dispatch(setStudent(data));
  };

  return (
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
    </Grid2>
  );
}
