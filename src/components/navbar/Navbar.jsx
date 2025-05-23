"use client";
import { Grid2 } from "@mui/material";
import {
  NavbarContainer,
  NavbarContent,
  NavbarContentContainer,
  StyledBox,
  StyledText,
  TextContainer,
} from "./styles";
import { useAccount, useConnect } from "wagmi";
import { Account } from "./Account/account";
import { WalletButton } from "./WalletButton/WalletButton";
import { useEffect } from "react";

export default function Navbar(props) {
  const { ref } = props;
  const { isConnected } = useAccount();

  useEffect(() => {
    
    if (!isConnected) {
      sessionStorage.removeItem("walletReloaded");
    }

    if (isConnected && !sessionStorage.getItem("walletReloaded")) {
      sessionStorage.setItem("walletReloaded", "true");
      window.location.reload();
    }
  }, [isConnected]);

  function ConnectWallet() {
    if (isConnected) return <Account />;
    return <WalletButton />;
  }

  return (
    <Grid2 ref={ref} sx={{ padding: "2.5% 5% 0 5%", width: "100%" }}>
      <NavbarContainer>
        <NavbarContentContainer>
          <Grid2
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            backgroundColor={"#d9d9d9"}
            borderRadius={"20% 0 0 20%"}
            zIndex={1000}
          >
            <StyledBox />
          </Grid2>
          <NavbarContent>
            <TextContainer href={"/"}>
              <StyledText>Home</StyledText>
            </TextContainer>
            <TextContainer href={"/search"}>
              <StyledText>Search</StyledText>
            </TextContainer>
            <TextContainer href={"/register"}>
              <StyledText>Register</StyledText>
            </TextContainer>
            <TextContainer href={"/push"}>
              <StyledText>Push Email</StyledText>
            </TextContainer>
          </NavbarContent>
        </NavbarContentContainer>
        <ConnectWallet />
      </NavbarContainer>
    </Grid2>
  );
}
