import { Box, Button, Grid2, Select, Snackbar, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledBox = styled(Box)(({ path }) => ({
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "768px",
  height:
    path?.includes("register") || path?.includes("search")
      ? "660px"
      : "fit-content",
  backgroundColor: "white",
  borderRadius: "20px",
  margin: "48px 0 48px 0",
  padding: "48px 48px 48px 48px",
  gap: "48px",
  overflowY: "scroll",
  boxShadow:
    "rgba(50, 50, 93, 0.65) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.39) 0px 18px 36px -18px inset",
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    marginTop: "12px",
    marginBottom: "12px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(115, 114, 114, 0.77)",
    borderRadius: "50px",
  },
}));

export const TextFieldContainer = styled(Grid2)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "fit-content",
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

export const StyledTextField = styled(TextField)(() => ({
  width: "100%",

  "& .MuiInputBase-root": {
    borderRadius: "24px",
  },

  "& input:-webkit-autofill": {
    WebkitTextFillColor: "black !important",
    WebkitBoxShadow: "0 0 0 100px white inset !important",
    transitionDelay: "9999s",
    transitionProperty: "background-color, color",
  },
}));

export const StyledSelect = styled(Select)({
  width: "100%",
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

export const StyledSnackbar = styled(Snackbar)(({status}) => ({
  "&&": {
    "& .MuiPaper-root": {
      backgroundColor: "#FFFFFF",
      borderLeft: status ? "8px solid #1aff00" : "8px solid #f20505"
    },

    "& .MuiSnackbarContent-message": {
      color: "#000000",
      fontSize: "125%",
    }
  },
}));
