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
import { use, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../../redux/actions/user_action";

export default function form() {

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    walletAddress: "",
    token: "",
  });

  console.log(user);

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
        <CTAButton type={"submit"} onClick={()=>{dispatch(getUser())}}>Submit</CTAButton>
      </CTAButtonContainer>
    </StyledBox>
  );
}
