import React, { useState, useEffect, useContext } from "react";
import { createClient } from "@supabase/supabase-js"; // Supabase klient til autentificering
import AuthContext from "../../context/AuthContext"; // Kontekst for autentificering
import { useGetQuery } from "../../hooks/useGetQuery"; // Brugerdefineret hook til at foretage GraphQL-forespørgsler
import { getAllNews } from "../../queries/getAllNews"; // GraphQL-forespørgsel for at hente alle nyheder

// URL og nøgle til Supabase klienten
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Login-siden komponent
const LoginPage = () => {
  // State til email og password inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Henter isLoggedIn og userEmail fra AuthContext
  const { isLoggedIn, userEmail, login, logout } = useContext(AuthContext);
  // Bruger brugerdefineret hook til at hente nyhedsdata
  const { data, isLoading, error } = useGetQuery(getAllNews, "allNews");

  // Funktion til at håndtere ændringer i autentificeringsstatus
  const handleAuthStateChange = (event, session) => {
    if (session && session.user) {
      login(session.user.email);
    } else {
      logout(); // Brug logout-funktionen fra AuthContext
    }
  };

  // Tilføj event listener når komponenten monteres
  useEffect(() => {
    if (!supabase.auth) {
      console.error(
        "Supabase authentication module is not initialized properly."
      );
    } else {
      const { data: authListener } = supabase.auth.onAuthStateChange(
        handleAuthStateChange
      );
    }
  }, []);

  // Funktion til at logge ud
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  // Funktion til at håndtere login-formular submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!supabase.auth) {
        console.error(
          "Supabase authentication module is not initialized properly."
        );
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Error signing in:", error.message);
        return;
      }

    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  // Rendere login-siden
  return (
    <div className="bg-white p-4 rounded-xl h-[50vh] mb-8 mx-8 relative">
      {/* Hvis brugeren er logget ind, vises en logget ind besked */}
      {isLoggedIn ? (
        <div className="w-1/2 absolute left-1/2 -translate-x-1/2 top-10">
          <h2 className="flex justify-start text-2xl font-bold mb-12">
            Logged in as:
          </h2>
          <div className="flex flex-col">
            <input
              className="bg-[#eee] border-[#C52525] border-[1px] px-2 py-1 mt-2 w-full"
              type="text"
              value={userEmail}
              readOnly
            />
            <button
              onClick={handleLogout}
              className="mt-6 hover:bg-[#eee] border-[#C52525] border-[1px] w-1/3 justify-center items-center py-2 uppercase font-bold"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        // Hvis brugeren ikke er logget ind, vises login-formularen
        <div className="w-1/2 absolute left-1/2 -translate-x-1/2 top-10">
          <h2 className="text-2xl font-bold mb-12">Login</h2>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label htmlFor="email">Brugernavn:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="hover:bg-[#eee] border-[#C52525] border-[1px] px-2 py-1 w-full mb-2"
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="hover:bg-[#eee] border-[#C52525] border-[1px] px-2 py-1 w-full"
            />
            <button
              type="submit"
              className="hover:bg-[#eee] w-1/3 justify-start py-2 mt-6 border-[#C52525] border-[1px] uppercase font-bold"
            >
              Log in
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
