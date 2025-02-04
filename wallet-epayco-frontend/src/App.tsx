import { Routes, Route } from "react-router-dom";

import AuthPage from "./pages/auth";
import ProtectedRoute from "./protectedRoute";
import IndexPage from "./pages";
import ConfirmPayment from "./pages/confirm-payment";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route element={<ConfirmPayment />} path="/confirm-payment" />
      {/* Rutas protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route element={<IndexPage />} path="/" />
      </Route>

      {/* Ruta de login */}
      <Route element={<AuthPage />} path="/auth" />
    </Routes>
  );
};

export default AppRoutes;
