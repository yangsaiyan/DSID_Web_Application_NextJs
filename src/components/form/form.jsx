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
import emailjs from "@emailjs/browser";
import { add, isEmpty } from "lodash";
import dynamic from "next/dynamic";
import { useAccount, useSignMessage } from "wagmi";
import {
  decryptStudentData,
  encryptStudentData,
  sessionSigs,
  useCreateSignatureRequest,
} from "hooks/LitProtocol";
import { setStudent } from "../../../redux/actions/student_action";

const Loading = dynamic(() => import("../loading/loading"), { ssr: false });

export default function form() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const params = useSearchParams();

  const formRef = useRef(null);

  const { address } = useAccount();

  const [formData, setFormData] = useState({
    name: "1",
    studentId: "1",
    nric: "1",
    email: "1",
    faculty: "1",
    course: "1",
    race: "1",
    gender: "1",
    nationality: "1",
    phoneNumber: "1",
    permanentHomeAddress: "1",
    walletAddress: address,
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
    setFormData({
      ...formData,
      studentId: params?.get("studentId"),
    });
  }, []);

  useEffect(() => {
    filterFormInput(formDisplay);
    setLoading(false);
  }, [formDisplay]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

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

  const onChange = (e) => {
    switch (e?.target?.name) {
      case "name":
        setFormData((prev) => ({
          ...prev,
          name: e?.target?.value,
        }));
        break;
      case "studentId":
        setFormData((prev) => ({
          ...prev,
          studentId: e?.target?.value,
        }));
        break;
      case "nric":
        setFormData((prev) => ({
          ...prev,
          nric: e?.target?.value,
        }));
        break;
      case "race":
        setFormData((prev) => ({
          ...prev,
          race: e?.target?.value,
        }));
        break;
      case "nationality":
        setFormData((prev) => ({
          ...prev,
          nationality: e?.target?.value,
        }));
        break;
      case "gender":
        setFormData((prev) => ({
          ...prev,
          gender: e?.target?.value,
        }));
        break;
      case "email":
        setFormData((prev) => ({
          ...prev,
          email: e?.target?.value,
        }));
        break;
      case "faculty":
        setFormData((prev) => ({
          ...prev,
          faculty: e?.target?.value,
        }));
        break;
      case "course":
        setFormData((prev) => ({
          ...prev,
          course: e?.target?.value,
        }));
        break;
      case "phoneNumber":
        setFormData((prev) => ({
          ...prev,
          phoneNumber: e?.target?.value,
        }));
        break;
      case "permanentHomeAddress":
        setFormData((prev) => ({
          ...prev,
          permanentHomeAddress: e?.target?.value,
        }));
        break;
      case "walletAddress":
        setFormData((prev) => ({
          ...prev,
          walletAddress: e?.target?.value,
        }));
        break;
      default:
        return;
    }
  };

  const submitForm = async (e) => {
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
      dispatch(
        setStudent({
          name: "1",
          studentId: "1",
          nric: "1",
          email: "1",
          faculty: "1",
          course: "1",
          race: "1",
          gender: "1",
          nationality: "1",
          phoneNumber: "1",
          permanentHomeAddress: "1",
          walletAddress: address,
        })
      );
      const { ciphertext, dataToEncryptHash } = encryptStudentData(
        address,
        formData
      );
      const sessionSignature = sessionSigs(dataToEncryptHash, address);
    }
  };
  const formInputErrorValidation = async () => {};

  return loading ? (
    <Loading />
  ) : (
    <StyledBox
      ref={formRef}
      component="form"
      onSubmit={submitForm}
      path={pathname}
    >
      <TextFieldContainer
        sx={{ paddingTop: pathname?.includes("register") && "486px" }}
      >
        {Object?.entries(formInput)?.map(([key, value]) => {
          return (
            <>
              {key !== "walletAddress" && key !== "token" && (
                <StyledTextField
                  label={value}
                  name={key}
                  value={!isEmpty(formData[key]) ? formData[key] : ""}
                  disabled={
                    !isEmpty(formData[key]) &&
                    (key == "studentId" ||
                      key == "email" ||
                      key == "faculty" ||
                      key == "course")
                  }
                  onChange={onChange}
                />
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
                  <StyledTextField
                    label={value}
                    name={key}
                    value={!isEmpty(formData[key]) ? formData[key] : ""}
                    onChange={onChange}
                  />
                  <ConnectWalletButton>Connect Wallet</ConnectWalletButton>
                </Grid2>
              )}
            </>
          );
        })}
      </TextFieldContainer>
      <CTAButtonContainer>
        <CTAButton type={"reset"}>Reset</CTAButton>
        <CTAButton type={"submit"}>Submit</CTAButton>
      </CTAButtonContainer>
    </StyledBox>
  );
}
