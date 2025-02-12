import { Box, Button, Grid2, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  maxHeight: "600px",
  maxWidth: "768px",
  width: "100%",
  height: "100%",
  backgroundColor: "white",
  borderRadius: "20px",
  padding: "48px",
  margin: "48px 0 48px 0",
  gap: "48px",
  boxShadow:
    "rgba(50, 50, 93, 0.65) 0px 30px 60px -12px inset, rgb(0, 0, 0) 0px 18px 36px -18px inset",
});

export const TextFieldContainer = styled(Grid2)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  gap: "24px",
});

export const ConnectWalletButton = styled(Button)({
  width: "50%",
  border: "2px solid rgba(0, 0, 0, 0.1)",
  textWrap: "nowrap",
  boxShadow: "0px 6px 40px -8px rgb(158, 158, 158)",
  textTransform: "none",
  color: "black",
  borderRadius: "24px",

  ":hover": {
    boxShadow: "0px 6px 44px -16px rgb(173, 172, 172) inset",
  },
});

export const StyledTextField = styled(TextField)({
  width: "100%",

  "& .MuiInputBase-root": {
    borderRadius: "24px",
  },
});

export const CTAButtonContainer = styled(Grid2)({
  display: "flex",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  gap: "24px",
});

export const CTAButton = styled(Button)(({ type }) => ({

  width: "100%",
  textWrap: "nowrap",
  boxShadow: "0px 6px 40px -8px rgb(158, 158, 158)",
  textTransform: "none",
  color: "black",
  borderRadius: "24px",

  ...(type === "reset" && { width: "30%" }),

  ":hover": {
    boxShadow: "0px 6px 44px -16px rgb(173, 172, 172) inset",
  },
}));
