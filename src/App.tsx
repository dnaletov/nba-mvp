import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Content from "./components/content/Content";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/about" element={<div>About</div>} />
        <Route path="/contacts" element={<div>Contacts</div>} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
