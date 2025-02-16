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
import { useAccount, useDisconnect } from "wagmi";
import { Account } from "./Account/account";
import { WalletButton } from "./WalletButton/WalletButton";

export default function Navbar() {
  // const { address } = useAccount()
  // const { disconnect } = useDisconnect()

  function ConnectWallet() {
    const { isConnected } = useAccount();
    if (isConnected) return <Account />;
    return (
    <WalletButton />
  );
  }

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
        <ConnectWallet></ConnectWallet>
      </NavbarContainer>
    </Grid2>
  );
}
