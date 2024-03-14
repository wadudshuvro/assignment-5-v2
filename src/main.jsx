// src/main.jsx (for React 18 and newer with Vite) or
// src/index.jsx (for older React versions)
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css"; // Make sure to import Tailwind CSS here

// For older React versions
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// For React 18 and newer
// import { createRoot } from 'react-dom/client';
// const container = document.getElementById('root');
// const root = createRoot(container);
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
