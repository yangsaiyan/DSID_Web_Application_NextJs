"use client";
import { Grid2 } from "@mui/material";
import {
  ConnectWalletButton,
  CTAButton,
  CTAButtonContainer,
  StyledBox,
  StyledTextField,
  TextFieldContainer,
} from "./styles";
import { useState } from "react";

export default function form() {
  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    walletAddress: "",
    token: "",
  });

  return (
    <StyledBox>
      <TextFieldContainer>
        <StyledTextField label="Student ID" />
        <Grid2
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"5px"}
          width={"100%"}
        >
          <StyledTextField label="Wallet Address" />
          <ConnectWalletButton>xxxxxxxxxxxxxxxxxxxx</ConnectWalletButton>
        </Grid2>
      </TextFieldContainer>
      <CTAButtonContainer>
        <CTAButton type={"reset"}>Reset</CTAButton>
        <CTAButton type={"submit"}>Submit</CTAButton>
      </CTAButtonContainer>
    </StyledBox>
  );
}
