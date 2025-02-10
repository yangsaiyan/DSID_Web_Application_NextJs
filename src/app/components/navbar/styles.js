import { Box, Grid2, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";

export const NavbarContainer = styled(Grid2)({

    display: "flex",
    minWidth: "100%",
    minHeight: "102px",
    // margin: "5px",
    alignItems: "center",
    justifyContent: "space-between",
})

export const StyledBox = styled(Box)({

    display: "flex",
    width: "82px",
    height: "82px",
    borderRadius: "20%",
    backgroundImage: "url('/assets/images/logo.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
})

export const NavbarContentContainer = styled(Grid2)({

    display: "flex",
    height: "100%",
    width: "fit-content",
    alignItems: "center",
})

export const NavbarContent = styled(Grid2)({

    display: "flex",
    alignItems: "center",
    minHeight: "56px",
    padding: "5px",
    borderRadius: "0 16px 16px 0",
    background: "rgba(217, 217, 217, 0.04)",
    boxShadow: "0px 0px 3px 4px rgba(130,130,130,0.38) inset",
    paddingLeft: "24px",
    paddingRight: "24px",
    gap: "36px",
})

export const TextContainer = styled(Link)({

    display: "flex",
    background: "transparent",
})

export const StyledText = styled(Typography)({


})

export const ConnectWalletButton = styled(Box)({

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "fit-content",
    height: "fit-content",
    padding: "16px",
    borderRadius: "12px",
    background: "rgb(121, 121, 121)",
    boxShadow: "0px 0px 3px 4px rgba(130,130,130,0.38) inset",
    cursor: "pointer",
    "&:hover": {
        background: "rgba(14, 14, 14, 0.08)",
    },
})