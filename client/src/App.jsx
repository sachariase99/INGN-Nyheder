import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useGetQuery } from "./hooks/useGetQuery";
import { getAllNews } from "./queries/getAllNews";
import NewsGrid from "./components/newsGrid/NewsGrid";
import NewsDetailsPage from "./components/newsDetails/NewsDetails";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import LoginPage from "./pages/loginPage/loginPage";

function App() {
  const { data, isLoading, error } = useGetQuery(getAllNews, "allNews");
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error.message}
      </div>
    );
  }

  // Videregive nyhedsdata som et prop til NewsDetailsPage komponentet
  return (
    <Router>
      <div className="mb-[100px]">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<NewsGrid isLoggedIn={isLoggedIn} />} />
        <Route
          path="/news/:id"
          element={<NewsDetailsPage news={data.newsPost} />}
        />
        <Route path="/loginPage" element={<LoginPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
