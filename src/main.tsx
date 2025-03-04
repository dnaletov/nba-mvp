import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createGlobalStyle } from "styled-components";
import App from "./App.tsx";

const GlobalStyles = createGlobalStyle`
  /* General reset styles */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Remove default styles for body */
  html, body {
    width: 100%;
    height: 100%;
    font-family: "Inter", sans-serif; /* Specify the desired font */
    background-color: #f8f9fa; /* Background color */
    color: #212529; /* Primary text color */
    line-height: 1.5; /* Improved readability */

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Remove underlines from links */
  a {
    text-decoration: none;
    color: inherit; /* Inherit color from parent */
  }

  /* Reset list styles */
  ul, ol {
    list-style: none;
  }

  /* Reset button styles */
  button {
    all: unset; /* Remove default styles */
    font: inherit
    cursor: pointer;
  }

  /* Improve image display */
  img {
    display: block;
    max-width: 100%;
    height: auto;
  }

  /* Reset form element styles */
  input, textarea, select {
    font: inherit;
    border: none;
    outline: none;
    background: none;
  }

  /* Set up a container */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
  }
`;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalStyles />
    <App />
  </StrictMode>
);
