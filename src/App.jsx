import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./app.css";
import Header from "./Components/Header";
import Home from "./Pages/HomePage";
import CoinPage from "./Pages/CoinPage";
import { useTheme } from "@chakra-ui/react";

function App() {
  const theme = useTheme();

  return (
    <BrowserRouter>
      <main
        style={{
          backgroundColor: theme.colors.commons[950],
          minHeight: "100dvh",
        }}
      >
        <Header />
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
