import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useGetQuery } from "./hooks/useGetQuery";
import { getAllNews } from "./queries/getAllNews";
import { NewsGrid, NewsDetailsPage, Navbar, Footer } from "./components";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import LoginPage from "./pages/loginPage/loginPage";

function App() {
  // Henter nyhedsdata fra GraphQL-endpunktet ved hjælp af brugerdefineret hook
  const { data, isLoading, error } = useGetQuery(getAllNews, "allNews");
  // Henter logget ind status fra context
  const { isLoggedIn } = useContext(AuthContext);

  // Håndtering af tilstande for indlæsning og fejl
  if (isLoading) {
    return (
      // Viser en "Loading..." besked mens data indlæses
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      // Viser en fejlbesked hvis der opstår en fejl under hentning af data
      <div className="flex justify-center items-center h-screen text-red-500">
        {error.message}
      </div>
    );
  }

  // Rendere de forskellige komponenter afhængigt af routing
  return (
    <Router>
      <div className="mb-[100px]">
        <Navbar />
      </div>
      <Routes>
        {/* Rute til at vise en grid af nyheder */}
        <Route path="/" element={<NewsGrid isLoggedIn={isLoggedIn} />} />
        {/* Rute til at vise detaljer for et enkelt nyhedsindlæg */}
        <Route
          path="/news/:id"
          element={<NewsDetailsPage news={data.newsPost} />}
        />
        {/* Rute til login-siden */}
        <Route path="/loginPage" element={<LoginPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
