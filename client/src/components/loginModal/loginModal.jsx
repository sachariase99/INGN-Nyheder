import React, { useState, useEffect, useContext } from 'react'; // Add useContext to the import statement
import { createClient } from '@supabase/supabase-js';
import { IoClose } from 'react-icons/io5';
import AuthContext from '../../context/AuthContext'; // Assuming AuthContext.jsx is in the context folder

const supabaseUrl = "https://ggysbgyccjjuhinsjruj.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdneXNiZ3ljY2pqdWhpbnNqcnVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMxNjIxODQsImV4cCI6MjAyODczODE4NH0.HTHwzuVzNehdRq_-OqJh_OozP1wDUqXY2XFTgnWmkdI";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const LoginModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn, userEmail, login, logout } = useContext(AuthContext);

  // Function to handle authentication state change
  const handleAuthStateChange = (event, session) => {
    if (session && session.user) {
      login(session.user.email); // Use login function from AuthContext
    } else {
      logout(); // Use logout function from AuthContext
    }
  };

  // Attach event listener when component mounts
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

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

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
  
      onClose();
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };
  

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded h-96 w-80 relative">
        {isLoggedIn ? (
          <div>
            <h2 className="flex justify-start">Logged in as:</h2>
            <div className="flex flex-col items-center">
              <input
                className="bg-[#eee] border-black border-[1px] rounded-xl px-2 py-1 mt-2 w-full"
                type="text"
                value={userEmail}
                readOnly
              />
              <button
                onClick={handleLogout}
                className="mt-2 bg-[#eee] hover:bg-[#ddd] w-1/2 justify-center items-center py-2 rounded-full uppercase font-bold"
              >
                Logout
              </button>
              <button
              onClick={onClose}
              className="text-2xl absolute top-2 right-2"
            >
              <IoClose />
            </button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-center">Login</h2>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="bg-[#eee] border-black border-[1px] rounded-xl px-2 py-1 mt-2 w-full"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="bg-[#eee] border-black border-[1px] rounded-xl px-2 py-1 mt-2 w-full"
              />
              <button
                type="submit"
                className="mt-2 bg-[#eee] hover:bg-[#ddd] w-1/2 justify-center items-center py-2 rounded-full uppercase font-bold"
              >
                Log in
              </button>
            </form>
            <button
              onClick={onClose}
              className="text-2xl absolute top-2 right-2"
            >
              <IoClose />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
