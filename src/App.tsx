import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/organisms/Header.tsx";
import Footer from "./components/organisms/Footer.tsx";
import HomePage from "./components/pages/HomePage.tsx";
import ProfilePage from "./components/pages/ProfilePage.tsx";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<ProfilePage />} />
        <Route path="/contacts" element={<div>Contacts</div>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
