import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { AuthGuard } from "./AuthGuard";
import { Login } from "../view/Login";
import { Register } from "../view/Register";
import { Dashboard } from "../view/Dashboard";
import { AuthLayout } from "../view/layouts/AuthLayout";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        <Route element={<AuthGuard isPrivate />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
