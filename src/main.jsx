// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./component/UserContext.jsx";
import BookProvider from "./component/BookContext.jsx";
import AuthProvider from "./component/AuthContext.jsx";
import TransactionProvider from "./component/TransactionContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <TransactionProvider>
        <UserProvider>
          <BookProvider>
            <App />
          </BookProvider>
        </UserProvider>
      </TransactionProvider>
    </AuthProvider>
  </BrowserRouter>,
);
