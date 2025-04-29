"use client";
import { Grid2, IconButton, InputLabel, MenuItem } from "@mui/material";
import {
  ConnectWalletButton,
  CTAButton,
  CTAButtonContainer,
  StyledBox,
  StyledSelect,
  StyledSnackbar,
  StyledTextField,
  TextFieldContainer,
} from "./styles";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useSearchParams } from "next/navigation";
import {
  formPath,
  userData,
  student_reg_abi,
  student_nft_abi,
} from "../../../constants";
import emailjs from "@emailjs/browser";
import { isEmpty } from "lodash";
import dynamic from "next/dynamic";
import { useAccount, useSignMessage } from "wagmi";
import { setStudent } from "../../../redux/actions/student_action";
import { storeStudent } from "hooks/GunDB";
import { GelatoRelay } from "@gelatonetwork/relay-sdk";
import { Contract, ethers } from "ethers";
import { polygonAmoy } from "viem/chains";
import { getURI } from "utils/NFT_Utils/nft_utils";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";

const Loading = dynamic(() => import("../loading/loading"), { ssr: false });

export default function form(props) {
  const { account } = props;

  const studentInfo = useSelector((state) => state.student);

  const [open, setSnackbarOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackStatus, setSnackStatus] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    nric: "",
    email: "",
    faculty: "",
    course: "",
    race: "",
    gender: "",
    nationality: "",
    phoneNumber: "",
    permanentHomeAddress: "",
    walletAddress: account?.address || "",
  });
  const formDefaultState = {
    name: "",
    studentId: "",
    nric: "",
    email: "",
    faculty: "",
    course: "",
    race: "",
    gender: "",
    nationality: "",
    phoneNumber: "",
    permanentHomeAddress: "",
    walletAddress: account?.address || "",
  };

  const { signMessageAsync } = useSignMessage();
  const relay = new GelatoRelay();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const params = useSearchParams();

  const formRef = useRef(null);

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const [formDisplay, setFormDisplay] = useState([]);
  const [formInput, setFormInput] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pathname?.includes("register")) {
      setFormDisplay(formPath?.register);
    } else if (pathname?.includes("push")) {
      setFormDisplay(formPath?.pushEmail);
    } else if (pathname?.includes("search")) {
      setFormDisplay(formPath?.search);
    }
  }, [pathname]);

  useEffect(() => {
    setFormData({
      ...formData,
      studentId: params?.get("studentId") || "",
      email: params?.get("email") || "",
      faculty: params?.get("faculty") || "",
      course: params?.get("course") || "",
    });
  }, []);

  useEffect(() => {
    if (pathname?.includes("search") && studentInfo?.walletAddress != "") {
      setFormData((prev) => ({
        ...prev,
        ...studentInfo,
      }));
    }
  }, [studentInfo]);

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

  const handleWriteContractRegister = async (formData) => {
    const signer = await provider.getSigner();

    const studentRegistryContract = new Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_STUDENT_REGISTRATION_ADDRESS,
      student_reg_abi,
      signer
    );

    const registerData = studentRegistryContract.interface.encodeFunctionData(
      "registerStudent",
      [formData.studentId]
    );

    const registerRequest = {
      chainId: polygonAmoy.id,
      target:
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_STUDENT_REGISTRATION_ADDRESS,
      data: registerData,
      user: account.address,
    };

    try {
      const registerResponse = await relay.sponsoredCallERC2771(
        registerRequest,
        provider,
        process.env.NEXT_PUBLIC_GELATO_API_1
      );
    } catch (error) {
      return false
    } finally {
      return true;
    }
  };

  const handleWriteContractNFT = async (uri) => {
    const signer = await provider.getSigner();

    const studentRegistryContract = new Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_STUDENT_REGISTRATION_ADDRESS,
      student_reg_abi,
      provider
    );

    studentRegistryContract.once(
      "StudentRegistered",
      async (student, studentId) => {

        const studentNFTContract = new Contract(
          process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_STUDENT_NFT_ADDRESS,
          student_nft_abi,
          signer
        );

        const mintData = studentNFTContract.interface.encodeFunctionData(
          "mint",
          [uri]
        );
        const mintRequest = {
          chainId: polygonAmoy.id,
          target: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_STUDENT_NFT_ADDRESS,
          data: mintData,
          user: account.address,
        };

        try {
          const mintResponse = await relay.sponsoredCallERC2771(
            mintRequest,
            provider,
            process.env.NEXT_PUBLIC_GELATO_API_2
          );
          setLoading(false);
        } catch (error) {
          setLoading(false);
          return false;
        } finally {
          return true;
        }
      }
    );
    return false;
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
            handleSnackbarOpen("Success!", true);
            setFormData(formDefaultState);
          },
          (error) => {
            handleSnackbarOpen(`Error, ${error.text}`, false);
          }
        );
    } else if (pathname?.includes("register")) {
      dispatch(setStudent(formData));
      setLoading(true);
      const storeStudentRes = storeStudent(formData);

      if(storeStudentRes){
        handleSnackbarOpen("Student Stored!", true);
      } else {
        handleSnackbarOpen("Failed to store student!", false);
      }

      const registerRes = handleWriteContractRegister(formData);

      if(registerRes) {
        handleSnackbarOpen("Registration Completed!", true);
      } else {
        handleSnackbarOpen("Registration Failed!", false);
      }

      const mintNftRes = handleWriteContractNFT(await getURI(formData?.studentId));

      if(mintNftRes){
        handleSnackbarOpen("Student NFT minted!", true);
      } else {
        handleSnackbarOpen("Failed to mint student NFT!", false);
      }
    }
  };

  const formInputErrorValidation = async () => {};

  const handleSnackbarOpen = (message, status) => {
    setSnackbarOpen(true);
    setSnackMessage(message);
    setSnackStatus(status);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleSnackbarClose}
    >
      <XMarkIcon style={{ width: 20, height: 20, color: "#000000" }} />
    </IconButton>
  );

  return loading ? (
    <Loading />
  ) : (
    <StyledBox
      ref={formRef}
      component="form"
      onSubmit={submitForm}
      path={pathname}
    >
      <StyledSnackbar
        status={snackStatus}
        open={open}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        message={snackMessage}
        action={action}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
      <TextFieldContainer
        sx={{
          paddingTop: pathname?.includes("register")
            ? "486px"
            : pathname?.includes("search") && "386px",
        }}
      >
        {Object?.entries(formInput)?.map(([key, value]) => {
          return (
            <>
              {key !== "walletAddress" && key !== "gender" && (
                <StyledTextField
                  label={value}
                  name={key}
                  value={!isEmpty(formData[key]) ? formData[key] : ""}
                  disabled={
                    !isEmpty(formData[key]) &&
                    !pathname.includes("push") &&
                    (key == "studentId" ||
                      key == "email" ||
                      key == "faculty" ||
                      key == "course")
                  }
                  onChange={onChange}
                />
              )}
              {key === "gender" && (
                <Grid2 width={"100%"}>
                  <InputLabel>Gender</InputLabel>
                  <StyledSelect
                    value={formData[key]}
                    onChange={onChange}
                    name={key}
                  >
                    <MenuItem value={"male"}>Male</MenuItem>
                    <MenuItem value={"female"}>Female</MenuItem>
                  </StyledSelect>
                </Grid2>
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
