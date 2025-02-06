import { Grid2, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";

export const NavbarContainer = styled(Grid2)({

    display: "flex",
    border: "1px solid red",
    maxWidth: "fit-content",
})

export const TextContainer = styled(Link)({

    border: "1px solid green",
    maxWidth: "fit-content",
})

export const StyledText = styled(Typography)({


})