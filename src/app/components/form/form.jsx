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
import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../../redux/actions/user_action";
import { usePathname, useRouter } from "next/navigation";
import { formPath, userData } from "../../../../constants";
import { Router } from "next/router";

export default function form() {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const user = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    icNumber: "",
    email: "",
    phoneNumber: "",
    permanentHomeAddress: "",
    walletAddress: "",
    token: "",
  });
  const [formDisplay, setFormDisplay] = useState([]); // set to empty when submitted
  const [formInput, setFormInput] = useState({});

  useEffect(() => {
    if (pathname?.includes("register")) {
      setFormDisplay(formPath?.register);
    } else if (pathname?.includes("pushEmail")) {
      setFormDisplay(formPath?.pushEmail);
    }
  }, [Router.isReady]);

  useEffect(() => {
    filterFormInput(formDisplay);
  }, [formDisplay]);

  const filterFormInput = (formDisplay) => {
    for (const [key, value] of Object.entries(userData)) {
      formDisplay?.forEach((item) => {
        if (key === item) {
          setFormInput((prev) => ({
            ...prev,
            [key]: value,
          }));
        }
      });
    }
  };

  return (
    <StyledBox>
      {Object?.entries(formInput)?.map(([key, value]) => {
        return (
          <TextFieldContainer>
            <StyledTextField label={userData[key]} />
          </TextFieldContainer>
        );
      })}
      <StyledTextField label="Student ID" />
      {/* <Grid2
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"5px"}
          width={"100%"}
        >
          <StyledTextField label="Wallet Address" />
          <ConnectWalletButton>xxxxxxxxxxxxxxxxxxxx</ConnectWalletButton>
        </Grid2> */}
      {/* <CTAButtonContainer>
        <CTAButton type={"reset"}>Reset</CTAButton>
        <CTAButton type={"submit"} onClick={()=>{dispatch(getUser({userName: "LLLL", userAge: "123"}))}}>Submit</CTAButton> 
      </CTAButtonContainer> */}
    </StyledBox>
  );
}
