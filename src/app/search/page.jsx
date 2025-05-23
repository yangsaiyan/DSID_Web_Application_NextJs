"use client";
import Loading from "@/components/loading/loading";
import { Grid2 } from "@mui/material";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useAccount } from "wagmi";

const FormComponent = dynamic(() => import("../../components/form/form"), {
  ssr: false,
  loading: () => <Loading />,
});

const SearchBar = dynamic(() => import("@/components/SearchBar/SearchBar"), {
  ssr: false,
  loading: () => <Loading />,
});

export default function Search() {
  const account = useAccount();
  const [showForm, setShowForm] = useState(false);

  return (
    <Grid2
      width={"100%"}
      height={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {showForm ? (
        <FormComponent currentAddressFromParent={account?.address} />
      ) : (
        <SearchBar setShowForm={setShowForm} showForm={showForm} />
      )}
    </Grid2>
  );
}
