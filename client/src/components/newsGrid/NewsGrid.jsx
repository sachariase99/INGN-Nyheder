import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetQuery } from "../../hooks/useGetQuery";
import { getAllNews } from "../../queries/getAllNews";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "graphql-request";

// Komponent til at vise nyheder i et gitterlayout
const NewsGrid = ({ isLoggedIn }) => {
  // Bruger useGetQuery-hook til at hente nyhedsdata fra GraphQL-endepunktet
  const { data, isLoading, error } = useGetQuery(getAllNews, "allNews");
  const [news, setNews] = useState([]); // State til at lagre nyhedsdata
  const location = useLocation(); // Bruges til at få adgang til den aktuelle URL-sti
  const token = import.meta.env.VITE_HYGRAPH_TOKEN; // Token til brug af Hygraph API

  const queryClient = useQueryClient(); // Bruges til at få adgang til query-clienten

  // Bruger useMutation-hook til at udføre mutation for at fjerne en nyhed
  const mutation = useMutation({
    mutationFn: async (postId) => {
      await request(
        `https://api-eu-west-2.hygraph.com/v2/cluucxoja0egr07um1minlfjo/master`,
        `mutation unpublishNews {
            unpublishNews(where: {id: "${postId}"}) {
              id
            }
          }`,
        {
          authorization: `Bearer ${token}`,
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries("allNews"); // Ugyldiggør forespørgslen efter mutation
    },
  });

  // Effekt til at filtrere nyheder baseret på kategori og gemme dem i state
  useEffect(() => {
    if (data && data.newsPost) {
      const searchParams = new URLSearchParams(location.search);
      const category = searchParams.get("category");

      const filteredNews =
        category === "alle" || !category
          ? data.newsPost
          : data.newsPost.filter((post) =>
              post.category
                .map((cat) => cat.toLowerCase())
                .includes(category.toLowerCase())
            );

      setNews(filteredNews);
    }
  }, [data, location.search]);

  // Funktion til at slette en nyhed
  const handleDelete = async (postId) => {
    try {
      await mutation.mutateAsync(postId);
    } catch (error) {
      console.error("Error unpublishing post:", error);
    }
  };

  // Viser en loading-besked, mens data indlæses
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  // Viser en fejlbesked, hvis der opstår en fejl under hentning af data
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error.message}
      </div>
    );
  }

  // Funktion til at segmentere nyheder baseret på forskellige sektioner i gitterlayoutet
  const segmentPosts = (offset, count) => news.slice(offset, offset + count);
  const numSegments = Math.ceil(news.length / 9); // Antal segmenter baseret på antallet af nyheder i alt

  return (
    <div className="my-4 mx-32">
      {/* Loop gennem hvert segment af nyheder */}
      {Array.from({ length: numSegments }).map((_, segmentIndex) => {
        const baseIndex = segmentIndex * 9; // Beregn baseret indeks for det aktuelle segment
        const featuredPost = news[baseIndex]; // Første indlæg i hvert segment vises større
        const gridPosts = segmentPosts(baseIndex + 1, 4); // De næste 4 indlæg i et gitterlayout
        const alternatingPosts = segmentPosts(baseIndex + 5, 2); // 2 skiftende indlæg
        const textOverImagePosts = segmentPosts(baseIndex + 7, 2); // De sidste 2 indlæg med tekst over billedet

        return (
          <React.Fragment key={segmentIndex}>
            {/* Vises det fremhævede indlæg */}
            {featuredPost && (
              <div className="w-full bg-[#ffffff] rounded-lg shadow-lg mb-8">
                {/* Viser overskrift, beskrivelse og forfatter af det fremhævede indlæg */}
                <div className="p-4 relative">
                  <ReactMarkdown className="text-2xl">
                    {featuredPost.heading.markdown}
                  </ReactMarkdown>
                  <ReactMarkdown>
                    {featuredPost.shortDesc.markdown}
                  </ReactMarkdown>
                  <div className="flex text-[#C52525] mb-2">
                    <p>{featuredPost.date}</p>
                    <span className="mx-1">-</span>
                    <ReactMarkdown>
                      {featuredPost.author.markdown}
                    </ReactMarkdown>
                  </div>
                  <Link to={`/news/${featuredPost.id}`}>Læs mere</Link>
                  {/* Viser redigerings- og sletknapper, hvis brugeren er logget ind */}
                  {isLoggedIn && (
                    <div className="absolute bottom-0 right-0">
                      <div className="p-4 flex justify-end text-xl text-[#C52525]">
                        <FaEdit className="mr-2 cursor-pointer" />
                        <MdDelete
                          className="cursor-pointer"
                          onClick={() => handleDelete(featuredPost.id)}
                        />
                      </div>
                    </div>
                  )}
                </div>
                {/* Viser billede af det fremhævede indlæg */}
                <img
                  src={featuredPost.image.url}
                  alt=""
                  className="w-full h-96 object-cover object-center rounded-b-lg"
                />
              </div>
            )}

            {/* Grid Posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* Venstre side */}
              <div className="md:col-span-1 flex flex-col gap-4">
                {/* Viser de første 2 indlæg i øverste række */}
                {gridPosts.slice(0, 2).map((post, index) => (
                  <div
                    key={post.id}
                    className={`bg-white rounded overflow-hidden shadow-lg ${
                      index % 2 === 0 ? "md:h-[36rem]" : "md:h-96"
                    }`}
                  >
                    {/* Viser overskrift, dato, forfatter og læs mere-link */}
                    <div className="p-4 relative">
                      <ReactMarkdown className="text-xl mb-2">
                        {post.heading.markdown}
                      </ReactMarkdown>
                      <div className="flex text-[#C52525]">
                        <p>{post.date}</p>
                        <span className="mx-1">-</span>
                        <ReactMarkdown>{post.author.markdown}</ReactMarkdown>
                      </div>
                      <Link to={`/news/${post.id}`}>Læs mere</Link>
                      {/* Viser redigerings- og sletknapper, hvis brugeren er logget ind */}
                      {isLoggedIn && (
                        <div className="absolute bottom-0 right-0">
                          <div className="p-4 flex justify-end text-xl text-[#C52525]">
                            <FaEdit className="mr-2 cursor-pointer" />
                            <MdDelete
                              className="cursor-pointer"
                              onClick={() => handleDelete(post.id)}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    {/* Viser billede af indlægget */}
                    <img
                      src={post.image.url}
                      alt=""
                      className="w-full object-cover object-center h-full"
                    />
                  </div>
                ))}
              </div>
              {/* Højre side */}
              <div className="md:col-span-1 flex flex-col gap-4">
                {/* Viser de næste 2 indlæg i nederste række */}
                {gridPosts.slice(2, 4).map((post, index) => (
                  <div
                    key={post.id}
                    className={`bg-white rounded overflow-hidden shadow-lg ${
                      index % 2 === 0 ? "md:h-96" : "md:h-[36rem]"
                    }`}
                  >
                    {/* Viser overskrift, dato, forfatter og læs mere-link */}
                    <div className="p-4 relative">
                      <ReactMarkdown className="text-xl mb-2">
                        {post.heading.markdown}
                      </ReactMarkdown>
                      <div className="flex text-[#C52525]">
                        <p>{post.date}</p>
                        <span className="mx-1">-</span>
                        <ReactMarkdown>{post.author.markdown}</ReactMarkdown>
                      </div>
                      <Link to={`/news/${post.id}`}>Læs mere</Link>
                      {/* Viser redigerings- og sletknapper, hvis brugeren er logget ind */}
                      {isLoggedIn && (
                        <div className="absolute bottom-0 right-0">
                          <div className="p-4 flex justify-end text-xl text-[#C52525]">
                            <FaEdit className="mr-2 cursor-pointer" />
                            <MdDelete
                              className="cursor-pointer"
                              onClick={() => handleDelete(post.id)}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    {/* Viser billede af indlægget */}
                    <img
                      src={post.image.url}
                      alt=""
                      className="w-full object-cover object-center h-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Alternating Posts */}
            {/* Viser 2 skiftende indlæg */}
            <div className="grid grid-cols-1 gap-4 mt-4 mb-8">
              {alternatingPosts.map((post, index) => (
                <div
                  key={post.id}
                  className={`flex flex-col md:flex-row ${
                    index % 2 === 0 ? "" : "md:flex-row-reverse"
                  } items-center bg-white mt-4 rounded-lg overflow-hidden shadow-lg`}
                >
                  {/* Viser billede af indlægget */}
                  <div className="md:w-1/2">
                    <img
                      src={post.image.url}
                      alt=""
                      className="w-full h-96 object-cover object-center"
                    />
                  </div>
                  {/* Viser overskrift, dato, forfatter og læs mere-link */}
                  <div className="md:w-1/2 p-4 h-full flex flex-col justify-start relative">
                    <ReactMarkdown className="text-xl font-bold">
                      {post.heading.markdown}
                    </ReactMarkdown>
                    <div className="flex text-[#C52525] my-2">
                      <p>{post.date}</p>
                      <span className="mx-1">-</span>
                      <ReactMarkdown>{post.author.markdown}</ReactMarkdown>
                    </div>
                    <ReactMarkdown>{post.shortDesc.markdown}</ReactMarkdown>
                    <Link className="text-start" to={`/news/${post.id}`}>
                      Læs mere
                    </Link>
                    {/* Viser redigerings- og sletknapper, hvis brugeren er logget ind */}
                    {isLoggedIn && (
                      <div className="absolute bottom-0 right-0">
                        <div className="p-4 flex justify-end text-xl text-[#C52525]">
                          <FaEdit className="mr-2 cursor-pointer" />
                          <MdDelete
                            className="cursor-pointer"
                            onClick={() => handleDelete(post.id)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Text Over Image Grid */}
            {/* Viser de sidste 2 indlæg med tekst over billedet */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {textOverImagePosts.map((post, index) => (
                <div
                  key={post.id}
                  className="flex flex-col justify-between bg-white my-4 rounded-lg overflow-hidden shadow-lg"
                >
                  {/* Viser overskrift, dato, forfatter og læs mere-link */}
                  <div className="p-4 relative">
                    <ReactMarkdown className="text-xl mb-2">
                      {post.heading.markdown}
                    </ReactMarkdown>
                    <div className="flex text-[#C52525]">
                      <p>{post.date}</p>
                      <span className="mx-1">-</span>
                      <ReactMarkdown>{post.author.markdown}</ReactMarkdown>
                    </div>
                    <Link to={`/news/${post.id}`}>Læs mere</Link>
                    {/* Viser redigerings- og sletknapper, hvis brugeren er logget ind */}
                    {isLoggedIn && (
                      <div className="absolute bottom-0 right-0">
                        <div className="p-4 flex justify-end text-xl text-[#C52525]">
                          <FaEdit className="mr-2 cursor-pointer" />
                          <MdDelete
                            className="cursor-pointer"
                            onClick={() => handleDelete(post.id)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Viser billede af indlægget */}
                  <img
                    src={post.image.url}
                    alt=""
                    className="w-full h-48 object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default NewsGrid;