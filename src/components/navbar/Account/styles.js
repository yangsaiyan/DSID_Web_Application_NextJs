import { styled } from "@mui/material/styles";
import ArrowLeftStartOnRectangleIcon from "@heroicons/react/24/solid/ArrowLeftStartOnRectangleIcon";
import { Typography } from "@mui/material";

export const LogoutIcon = styled(ArrowLeftStartOnRectangleIcon)({
    width: "24px",
    height: "24px",
    color: "currentColor",
    cursor: "pointer",
})

export const StyledText = styled(Typography)({

    color: "black",
    fontSize: "20px",
    fontWeight: "700",
})