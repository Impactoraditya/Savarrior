import { createTheme } from '@mui/material/';
import { styled } from "@mui/material/styles";
import MuiButton from "@mui/material/Button"

export const colors = {
  primary: "#329c92",
  primaryicons: "#000000d1"
}

export const Theme = createTheme({
  typography: {
    fontFamily: [
      "Urbanist",
      "sans-serif"
    ].join(","),
    fontWeight: "800"
  },
  palette: {
    primary: { main: "#329c92" },
    secondary: { main: "#ffcc80" },
  },
}

);

export const Button = styled(MuiButton)(({ theme }) => ({
  background: "#329c92",
  borderRadius: "25px",
  fontSize: "18px",
  ['&:hover']: {
    background: "#329c92",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "16px"
  }
}));

export const SquareButton = styled(MuiButton)((props) => ({
  background: "#329c92",
  borderRadius: "0px",
  fontSize: "18px",
  ['&:hover']: {
    background: "#329c92",
  }
}));


