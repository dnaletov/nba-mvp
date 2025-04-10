import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/organisms/Header.tsx";
import Footer from "./components/organisms/Footer.tsx";
import PlayersList from "./components/pages/PlayersList";
import ProfilePage from "./components/pages/ProfilePage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./components/pages/HomePage.tsx";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/players" element={<PlayersList />} />
          <Route path="/about" element={<ProfilePage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
