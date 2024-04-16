import React from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const NewsDetailsPage = ({ news }) => {
  const { id } = useParams();

  // Tjek om nyheds arrayet er undefined eller tomt.
  if (!news || news.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error fetching news details.
      </div>
    );
  }

  // Find nyhed med id
  const newsDetails = news.find((post) => post.id === id);

  // Tjek om nyheden med den id findes
  if (!newsDetails) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        News details not found.
      </div>
    );
  }

  // Tilføjer plads mellem paragraphs
  const components = {
    p: ({ children }) => <p className="mb-4">{children}</p>,
  };

  return (
    <div className="my-4 mx-32">
      <div className="w-full bg-[#ffffff] rounded-lg shadow-lg mb-8">
        <img
          src={newsDetails.image.url}
          alt=""
          className="w-full h-96 object-cover object-center rounded-t-lg"
        />
        <div className="p-4">
          <ReactMarkdown className="text-2xl" components={components}>
            {newsDetails.heading.markdown}
          </ReactMarkdown>
          <div className="flex text-[#C52525] mb-2">
            <p>{newsDetails.date}</p>
            <span className="mx-1">-</span>
            <ReactMarkdown>{newsDetails.author.markdown}</ReactMarkdown>
          </div>
          <ReactMarkdown components={components}>
            {newsDetails.longDesc.markdown}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailsPage;
