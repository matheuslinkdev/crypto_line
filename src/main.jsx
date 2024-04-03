import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const colors = {
  commons: {
    transparent: {
      50: "#00000000",
      300: "#65656550",
      600: "#50505075",
      900: "#00000055"
    },
    50: "#f6f6f6",
    100: "#e7e7e7",
    200: "#d1d1d1",
    300: "#b0b0b0",
    400: "#888888",
    500: "#6d6d6d",
    600: "#5d5d5d",
    700: "#4f4f4f",
    800: "#454545",
    900: "#303030",
    950: "#252525",
    975: "#101010"
  },
  blue: {
    50: "#e9fffe",
    100: "#c9fffd",
    200: "#99ffff",
    300: "#54fdff",
    400: "#07efff",
    500: "#00d1ef",
    600: "#00a6c9",
    700: "#0083a1",
    800: "#086982",
    900: "#0c566d",
    950: "#001b24",
  },
  yellow: {
    50: "#ffffe7",
    100: "#feffc1",
    200: "#fffc86",
    300: "#fff241",
    400: "#ffe30d",
    500: "#fad000",
    600: "#d19c00",
    700: "#a66f02",
    800: "#89570a",
    900: "#74470f",
    950: "#442504",
  },
};

const theme = extendTheme({ colors });

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
