import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/organisms/Header.tsx";
import PlayersList from "./components/organisms/PlayersList.tsx";
import Footer from "./components/organisms/Footer.tsx";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<PlayersList />} />
        <Route path="/about" element={<div>About</div>} />
        <Route path="/contacts" element={<div>Contacts</div>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
