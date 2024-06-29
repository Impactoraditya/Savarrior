import Header from "./Components/Header";
import HomePage from "./Pages/Home/HomePage";
import { ThemeProvider } from "@mui/material";
import { Theme } from "./Theme";
import Footer from "./Components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RescuePage from "./Pages/Rescues/RescuePage";
import AgencyPage from "./Pages/Agency/AgencyPage";
import SingleAgency from "./Pages/SingleAgency/SingleAgency";
import Register from "./Pages/Register";
import AppPage from "./Pages/AppPage";

function App() {

  const url = "Savarrior - Help Earthlings & Voiceless"

  return (
    <ThemeProvider theme={Theme}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" index element={<HomePage url={url} />} />
          <Route path="/rescues" element={<RescuePage url={url} />} />
          <Route path="/ngos-and-people" element={<AgencyPage url={url} />} />
          <Route path="/ngo/:slug/:id" element={<SingleAgency url={url} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/download-app" element={<AppPage url={url} />} />
        </Routes>
        <div><Footer /></div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
