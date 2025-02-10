"use client";
import { Grid2 } from "@mui/material";
import {
  ConnectWalletButton,
  NavbarContainer,
  NavbarContent,
  NavbarContentContainer,
  StyledBox,
  StyledText,
  TextContainer,
} from "./styles";

export default function Navbar() {
  const isConnected = false;

  return (
    <Grid2 sx={{ padding: "0 5% 0 5%" }}>
      <NavbarContainer>
        <NavbarContentContainer>
          <StyledBox />
          <NavbarContent>
            <TextContainer href={"/home"}>
              <StyledText>Home</StyledText>
            </TextContainer>
            <TextContainer href={"/search"}>
              <StyledText>Search</StyledText>
            </TextContainer>
            <TextContainer href={"/register"}>
              <StyledText>Register</StyledText>
            </TextContainer>
          </NavbarContent>
        </NavbarContentContainer>
        {isConnected ? (
          <>
            0x123...456
          </>
        ) : (
          <>
            <ConnectWalletButton>Connect Wallet</ConnectWalletButton>
          </>
        )}
      </NavbarContainer>
    </Grid2>
  );
}
