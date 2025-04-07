import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/organisms/Header.tsx";
import Footer from "./components/organisms/Footer.tsx";
import PlayersList from "./components/pages/PlayersList";
import ProfilePage from "./components/pages/ProfilePage.tsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<PlayersList />} />
          <Route path="/about" element={<ProfilePage />} />
          <Route path="/contacts" element={<div>Contacts</div>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
