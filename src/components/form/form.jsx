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
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { usePathname, useSearchParams } from "next/navigation";
import { formPath, userData } from "../../../constants";
import Loading from "../loading/loading";
import emailjs from '@emailjs/browser';
import { isEmpty } from "lodash";

export default function form() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const params = useSearchParams();

  const formRef = useRef(null);

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pathname?.includes("register")) {
      setFormDisplay(formPath?.register);
    } else if (pathname?.includes("push")) {
      setFormDisplay(formPath?.pushEmail);
    }
  }, [pathname]);

  useEffect(() => {

    console.log(params.get("studentId"));
    setFormData({
      ...formData,
      studentId: params?.get("studentId")
    });
  }, [])

  useEffect(() => {
    filterFormInput(formDisplay);
    setLoading(false);
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

  const submitForm = (e) => {
    e.preventDefault();

    if (pathname?.includes("push") && formRef) {
      emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          formRef?.current,
          {
            publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
          }
        )
        .then(
          () => {
            console.log("SUCCESS!"); //add toast later
          },
          (error) => {
            console.log("FAILED...", error.text); //add toast later
          }
        );
    } else if (pathname?.includes("register")) {

    }
  };

  const formInputErrorValidation = () => {};

  return loading ? (
    <Loading />
  ) : (
    <StyledBox ref={formRef} component="form" onSubmit={submitForm} path={pathname}>
      <TextFieldContainer
        sx={{ paddingTop: pathname?.includes("register") && "96px" }}
      >
        {Object?.entries(formInput)?.map(([key, value]) => {
          return (
            <>
              {key !== "walletAddress" && key !== "token" && (
                <StyledTextField label={userData[key]} name={key} value={formData[key]} disabled={!isEmpty(formData[key])} />
              )}
              {key === "walletAddress" && (
                <Grid2
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={"5px"}
                  width={"100%"}
                >
                  <StyledTextField label={userData[key]} />
                  <ConnectWalletButton>Connect Wallet</ConnectWalletButton>
                </Grid2>
              )}
            </>
          );
        })}
      </TextFieldContainer>
      <CTAButtonContainer>
        <CTAButton type={"reset"}>Reset</CTAButton>
        <CTAButton
          type={"submit"}
        >
          Submit
        </CTAButton>
      </CTAButtonContainer>
    </StyledBox>
  );
}
