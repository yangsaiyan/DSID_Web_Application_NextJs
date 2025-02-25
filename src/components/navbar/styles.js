import { Box, Grid2, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";

export const NavbarContainer = styled(Grid2)({

    display: "flex",
    minWidth: "100%",
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
    boxShadow: "0px 0px 10px 1px rgb(0, 0, 0)",
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
    height: "82px",
    padding: "5px",
    borderRadius: "0 48px 48px 0",
    boxShadow: "0px 0px 10px 5px rgb(0, 0, 0)",
    background: "#d9d9d9",
    paddingLeft: "24px",
    paddingRight: "24px",
    gap: "36px",
})

export const TextContainer = styled(Link)({

    position: "relative",
    display: "flex",
    transition: "color 0.3s ease",
  
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      width: "0%",
      height: "2px",
      backgroundColor: "black",
      transition: "width 0.3s ease, left 0.3s ease",
    },
  
    "&:hover:after": {
      width: "100%",
    },
})

export const StyledText = styled(Typography)({

    color: "black",
    fontSize: "20px",
    fontWeight: "700",
})

export const ConnectWalletButton = styled(Box)({

    display: "flex",
    gap: "8px",
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