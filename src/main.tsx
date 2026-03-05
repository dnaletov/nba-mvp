import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createGlobalStyle } from "styled-components";
import App from "./App.tsx";

const GlobalStyles = createGlobalStyle`
  :root {
    --primary: #c9082a; /* NBA Red */
    --secondary: #17408b; /* NBA Blue */
    --bg-dark: #0a0a0c;
    --card-bg: rgba(255, 255, 255, 0.05);
    --glass-bg: rgba(10, 10, 12, 0.75);
    --text-main: #f8f9fa;
    --text-muted: #a0aec0;
    --border-color: rgba(255, 255, 255, 0.1);
    --accent: #ed174c;
    --font-main: 'Outfit', sans-serif;
    --font-heading: 'Montserrat', sans-serif;
  }

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    font-family: var(--font-main);
    background-color: var(--bg-dark);
    color: var(--text-main);
    line-height: 1.6;
    overflow-x: hidden;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: color 0.3s ease;
  }

  ul, ol {
    list-style: none;
  }

  button {
    all: unset;
    font: inherit;
    cursor: pointer;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }

  input, textarea, select {
    font: inherit;
    border: none;
    outline: none;
    background: none;
    color: inherit;
  }

  .container {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 24px;
  }

  /* Premium Scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: var(--bg-dark);
  }

  ::-webkit-scrollbar-thumb {
    background-color: #2d3748;
    border-radius: 10px;
    border: 3px solid var(--bg-dark);
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #4a5568;
  }

  /* Smooth animations for all elements */
  * {
    transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;
  }
`;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalStyles />
    <App />
  </StrictMode>,
);
