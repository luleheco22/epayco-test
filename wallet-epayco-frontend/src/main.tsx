import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { Provider } from "./provider.tsx";
import "@/styles/globals.css";
import { WalletProvider } from "./context/walletContext.tsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <WalletProvider>
        <Provider>
          <ToastContainer
            closeOnClick
            draggable
            pauseOnFocusLoss
            pauseOnHover
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            position="top-right"
            rtl={false}
            theme="light"
          />
          <App />
        </Provider>
      </WalletProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
