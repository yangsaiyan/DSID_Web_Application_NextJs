"use client";
import { Button, Grid2, TextField } from "@mui/material";
import { getStudent } from "hooks/GunDB";
import { useState } from "react";


export default function SearchBar() {

    const [searchQuery, setSearchQuery] = useState("");

    const onChange = (e) => {
        setSearchQuery(e?.target?.value);
    }

    const onSubmit = () => {
        console.log(getStudent(searchQuery));
    }

    return <Grid2 width={"100%"} height={"100%"} sx={{backgroud: "white"}}>
        <TextField label="Wallet Address" value={searchQuery} onChange={onChange} />
        <Button onClick={onSubmit}>Search</Button>
    </Grid2>;
}