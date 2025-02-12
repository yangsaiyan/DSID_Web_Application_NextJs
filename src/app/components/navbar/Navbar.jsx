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
          </NavbarContent>
        </NavbarContentContainer>
        {isConnected ? (
          <>0x123...456</>
        ) : (
          <>
            <ConnectWalletButton>Connect Wallet</ConnectWalletButton>
          </>
        )}
      </NavbarContainer>
    </Grid2>
  );
}
