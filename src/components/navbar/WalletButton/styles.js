import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import ChevronDownIcon from "@heroicons/react/24/solid/ChevronDownIcon";

export const ConnectWalletButton = styled(Box)({

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "fit-content",
    height: "fit-content",
    padding: "16px",
    gap: "8px",
    cursor: "pointer",

    ":hover": {
        textShadow: "0px 0px 1px rgba(0,0,0,0.7)",
    },
})

export const StyledChevronDownIcon = styled(ChevronDownIcon)({
    width: "24px",
    height: "24px",
    marginRight: "8px",
    color: "currentColor",
    cursor: "pointer",
})