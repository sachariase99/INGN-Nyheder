import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetQuery } from "../../hooks/useGetQuery";
import { getAllNews } from "../../queries/getAllNews";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query"; // Import useQueryClient
import { request } from "graphql-request";

const NewsGrid = ({ isLoggedIn }) => {
  const { data, isLoading, error } = useGetQuery(getAllNews, "allNews");
  const [news, setNews] = useState([]);
  const location = useLocation();
  const token =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MTMyNDk4MTIsImF1ZCI6WyJodHRwczovL2FwaS1ldS13ZXN0LTIuaHlncmFwaC5jb20vdjIvY2x1dWN4b2phMGVncjA3dW0xbWlubGZqby9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC1ldS13ZXN0LTIuaHlncmFwaC5jb20vIiwic3ViIjoiMDQxYjNjMDItMjA1OC00YTljLWJhNzQtODBiZTk3OTk5M2RmIiwianRpIjoiY2x2MjBwYnpjcXcxczA3bXY1Ym1nNzl6bSJ9.0JJ4-jdzDO0uuTJynRCPwyUPCuklMPq_UBIpT3YFJ0DkF0_EbJa67I4y2RpyhV3PoNK_S8Fo0Y6eLlRgyhIxwQop7uDbVvjB6JjVtHXf3rnnSW2mNAR7BN9xevDKU7_fpu_PmyoWJDbyu5FzAdkN3mn7_SoCIbjqnCPl8yZtGCIChp4dJEZBlJiY1ZG3gZ2geTCiGHU10cN1T0mg6yMuBZm9rCyQdw8BYTK08ApYlXL0bTEFG8UUuXJvQoJjXtUJvkSxrtKMZOoVUirirwdYoRfxekoDsqU68dyCsd-ke_Z6euNDMlHgaWkAUyeezjcYJGdBzVe_QgYGSokxcIahgzcpwFcFySMOkrcPZlCbQbNquqdURyDsKW-On33aAQZWJb13hIZmxIHg1id0Xi_0fHGm1pnZH_vvrYUTK6l-7HYMcwwd2Bl8ull-MDvK4RtDnrKdf_RLrQMvZ-oTjsdCoAvzxY9G458SXKjoFVFXYOyvAHCtcQfixm4ywyEREQh5bMGAGw2XDIxsJ9Udwb7utHAZShfwIxXaE6BxRml6UyZmbbCl2-Ggag33oVD1DwHJZ2bnjr1tOe0GrTUKAXuciPn70nTrALEugWAsd142C-d9q-U3bK33svdqYNcDrFOasBV19C-WPKi_HVnUaLz0Ova8L9jMBi_CIS-h_V9rx-Y";

  const queryClient = useQueryClient(); // Access the query client

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
      queryClient.invalidateQueries("allNews"); // Invalidate the query after mutation
    },
  });

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

  const handleDelete = async (postId) => {
    try {
      await mutation.mutateAsync(postId);
    } catch (error) {
      console.error("Error unpublishing post:", error);
    }
  };

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

  // Helper function to segment posts
  const segmentPosts = (offset, count) => news.slice(offset, offset + count);

  // Number of segments
  const numSegments = Math.ceil(news.length / 9);

  return (
    <div className="my-4 mx-32">
      {Array.from({ length: numSegments }).map((_, segmentIndex) => {
        // Beregn indekser for det aktuelle sekment
        const baseIndex = segmentIndex * 9;
        const featuredPost = news[baseIndex]; // Første indlæg af hvert segment som vist
        const gridPosts = segmentPosts(baseIndex + 1, 4); // Næste 4 indlæg af griddet
        const alternatingPosts = segmentPosts(baseIndex + 5, 2); // 2 skiftende indlæg
        const textOverImagePosts = segmentPosts(baseIndex + 7, 2); // Sidste 2 indlæg tekst over billede

        return (
          <React.Fragment key={segmentIndex}>
            {/* Featured Post */}
            {featuredPost && (
              <div className="w-full bg-[#ffffff] rounded-lg shadow-lg mb-8">
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
                <img
                  src={featuredPost.image.url}
                  alt=""
                  className="w-full h-96 object-cover object-center rounded-b-lg"
                />
              </div>
            )}

            {/* Grid Posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* Top Row */}
              <div className="md:col-span-1 flex flex-col gap-4">
                {gridPosts.slice(0, 2).map((post, index) => (
                  <div
                    key={post.id}
                    className={`bg-white rounded overflow-hidden shadow-lg ${
                      index % 2 === 0 ? "md:h-[36rem]" : "md:h-96"
                    }`}
                  >
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
                    <img
                      src={post.image.url}
                      alt=""
                      className="w-full object-cover object-center h-full"
                    />
                  </div>
                ))}
              </div>
              {/* Bottom Row */}
              <div className="md:col-span-1 flex flex-col gap-4">
                {gridPosts.slice(2, 4).map((post, index) => (
                  <div
                    key={post.id}
                    className={`bg-white rounded overflow-hidden shadow-lg ${
                      index % 2 === 0 ? "md:h-96" : "md:h-[36rem]"
                    }`}
                  >
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
            <div className="grid grid-cols-1 gap-4 mt-4 mb-8">
              {alternatingPosts.map((post, index) => (
                <div
                  key={post.id}
                  className={`flex flex-col md:flex-row ${
                    index % 2 === 0 ? "" : "md:flex-row-reverse"
                  } items-center bg-white mt-4 rounded-lg overflow-hidden shadow-lg`}
                >
                  <div className="md:w-1/2">
                    <img
                      src={post.image.url}
                      alt=""
                      className="w-full h-96 object-cover object-center"
                    />
                  </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {textOverImagePosts.map((post, index) => (
                <div
                  key={post.id}
                  className="flex flex-col justify-between bg-white my-4 rounded-lg overflow-hidden shadow-lg"
                >
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