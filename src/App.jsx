import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useEffect, useState } from "react";

import { supabase } from "./supabaseClient";

import Home from "./pages/Home";
import SellerDashboard from "./pages/SellerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerDashboard from "./pages/customerdashboard";

function App() {
  const [session, setSession] = useState(null);

  // CHECK LOGIN SESSION
  useEffect(() => {
    // Existing session
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session);
      });

    // Listen for login/logout
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Routes>

        {/* HOME PAGE */}
        <Route
          path="/"
          element={<Home session={session} />}
        />

        {/* SELLER DASHBOARD */}
        <Route
          path="/seller-dashboard"
          element={
            session ? (
              <SellerDashboard session={session} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin-dashboard"
          element={
            session ? (
              <AdminDashboard session={session} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* CUSTOMER DASHBOARD */}
        <Route
          path="/customer-dashboard"
          element={
            session ? (
              <CustomerDashboard session={session} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;