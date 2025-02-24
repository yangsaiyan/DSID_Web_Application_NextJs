"use client";
import { Grid2 } from "@mui/material";
import {
  ConnectWalletButton,
  CTAButton,
  CTAButtonContainer,
  StyledTextField,
  TextFieldContainer,
} from "./styles";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../../../redux/actions/user_action";
import { usePathname } from "next/navigation";
import { formPath, userData } from "../../../../constants";
import Loading from "../loading/loading";

const StyledBox = dynamic(() => import('./styles').then(mod => mod.StyledBox), {
  ssr: false
});

export default function form() {
  const dispatch = useDispatch();
  const pathname = usePathname();

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
    } else if (pathname?.includes("pushEmail")) {
      setFormDisplay(formPath?.pushEmail);
    }
  }, [pathname]);

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

  return loading ? (
    <Loading />
  ) : (
    <StyledBox>
      <TextFieldContainer
        sx={{ paddingTop: pathname?.includes("register") && "96px" }}
      >
        {Object?.entries(formInput)?.map(([key, value]) => {
          return (
            <Grid2 width={"100%"} key={key}>
              {key !== "walletAddress" && key !== "token" && (
                <StyledTextField label={userData[key]} />
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
            </Grid2>
          );
        })}
      </TextFieldContainer>
      <CTAButtonContainer>
        <CTAButton type={"reset"}>Reset</CTAButton>
        <CTAButton
          type={"submit"}
          onClick={() => {
            dispatch(getUser({ userName: "LLLL", userAge: "123" }));
          }}
        >
          Submit
        </CTAButton>
      </CTAButtonContainer>
    </StyledBox>
  );
}
