import "rc-slider/assets/index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { IconContext } from "react-icons";
import App from "./App";
import { ImageEditorProvider } from "./components/ImageEditor/hooks/useImageEditor";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <IconContext.Provider
      value={{
        size: "18",
      }}
    >
      <ImageEditorProvider>
        <App />
      </ImageEditorProvider>
    </IconContext.Provider>
  </React.StrictMode>,
);
