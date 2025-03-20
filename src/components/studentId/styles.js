import { Box, Grid2, Typography } from "@mui/material";
import styled from "styled-components";


export const StudentIDContainer = styled(Grid2)({

    //To hide it
    position: "absolute",
    left: "-999999px",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    width: "100%",
    height: "100%",
})

export const StudentIDBody = styled(Grid2)({

    display: "flex",
    flexDirection:"row",
    justifyContent: "space-between",
    alignItems: "center",
    
    borderRadius: "20px",

    background: "white",

    width: "400px",
    height: "250px",
})

export const StudentLabelContainer = styled(Grid2)({

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    
    width: "70px",
    height: "100%",

    backgroundColor: "#01072b",
    borderRadius: "20px 0 0 20px",
})

export const StudentLabel = styled(Typography)({

    transform: "rotate(-90deg) scaleX(2) scaleY(2)",
    fontSize: "24px",
    fontWeight: 700,
    color: "white",
})

export const StudentInfoContainer = styled(Grid2)({

    display: "flex",
    flexDirection: "column",

    width: "100%",
    height: "100%",

    gap: "10px",
    padding: "5px",
})

export const StudentInfoWrapper = styled(Grid2)({
    display: "flex",
    flexDirection: "column",

    width: "100%",
    height: "100%",

    gap: "10px",
    paddingLeft: "20px",
    paddingRight: "20px",
})

export const StudentInfoTopContainer = styled(Grid2)({

    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    width: "100%",
    height: "50%",
    gap: "10px",
})

export const StyledBox = styled(Box)({

    display: "flex",
    width: "60px",
    height: "60px",
    border: "1px solid black",
    borderRadius: "20%",
    backgroundImage: "url('/assets/images/logo.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
})

export const StudentInfoText = styled(Typography)({

    wordBreak: "break-all"
})