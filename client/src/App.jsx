import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useGetQuery } from "./hooks/useGetQuery";
import { getAllNews } from "./queries/getAllNews";
import NewsPost from "./components/NewsPost/NewsPost";
import NewsDetailsPage from "./components/newsDetails/NewsDetails";
import Navbar from "./components/navbar/Navbar";

function App() {
  const { data, isLoading, error } = useGetQuery(getAllNews, "allNews");

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error.message}</div>;
  }

  // Pass news data as a prop to NewsDetailsPage component
  return (
    <Router>
      <div className="mb-[100px]">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<NewsPost />} />
        <Route path="/news/:id" element={<NewsDetailsPage news={data.newsPost} />} />
      </Routes>
    </Router>
  );
}

export default App;
