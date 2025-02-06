"use client";
import {NavbarContainer, StyledText, TextContainer} from "./styles";

export default function Navbar() {

    return (
        <NavbarContainer>
            <TextContainer href={"/home"}>
                <StyledText>
                    Home
                </StyledText>
            </TextContainer>
            <TextContainer href={"/search"}>
                <StyledText>
                    Search
                </StyledText>
            </TextContainer>
            <TextContainer href={"/register"}>
                <StyledText>
                    Register
                </StyledText>
            </TextContainer>
        </NavbarContainer>
    )
}