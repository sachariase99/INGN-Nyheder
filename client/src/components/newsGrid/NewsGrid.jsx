import React, { useEffect, useState } from 'react';
import { useGetQuery } from "../../hooks/useGetQuery";
import { getAllNews } from "../../queries/getAllNews";
import ReactMarkdown from 'react-markdown';
import { Link } from "react-router-dom";

const NewsGrid = () => {
    const { data, isLoading, error } = useGetQuery(getAllNews, "allNews");
    const [news, setNews] = useState([]);

    useEffect(() => {
        if (data && data.newsPost) {
            setNews(data.newsPost);
            console.log("News:", data.newsPost); // Log news posts here
        }
    }, [data]);

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">{error.message}</div>;
    }

    // Helper function to segment the news for different sections
    const segmentPosts = (offset, count) => news.slice(offset, offset + count);

    // Divide news into repeating segments of 9 posts
    const numSegments = Math.ceil(news.length / 9);

    return (
        <div className="my-4 mx-32">
            {Array.from({ length: numSegments }).map((_, segmentIndex) => {
                // Calculate indices for the current segment
                const baseIndex = segmentIndex * 9;
                const featuredPost = news[baseIndex]; // First post of each segment as featured
                const gridPosts = segmentPosts(baseIndex + 1, 4); // Next 4 posts for the grid
                const alternatingPosts = segmentPosts(baseIndex + 5, 2); // 2 alternating posts
                const textOverImagePosts = segmentPosts(baseIndex + 7, 2); // Last 2 posts for text over image

                return (
                    <React.Fragment key={segmentIndex}>
                        {/* Featured Post */}
                        {featuredPost && (
                            <div className="w-full bg-[#ffffff] rounded-lg shadow-lg mb-8">
                                <div className='p-4'>
                                    <ReactMarkdown className="text-2xl">{featuredPost.heading.markdown}</ReactMarkdown>
                                    <ReactMarkdown>{featuredPost.shortDesc.markdown}</ReactMarkdown>
                                    <div className='flex text-[#C52525] mb-2'>
                                        <p>{featuredPost.date}</p>
                                        <span className='mx-1'>-</span>
                                        <ReactMarkdown>{featuredPost.author.markdown}</ReactMarkdown>
                                    </div>
                                    <Link to={`/news/${featuredPost.id}`}>Læs mere</Link>
                                </div>
                                <img src={featuredPost.image.url} alt="" className="w-full h-96 object-cover object-center rounded-b-lg" />
                            </div>
                        )}

                        {/* Grid Posts */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            {/* Top Row */}
                            <div className="md:col-span-1 flex flex-col gap-4">
                                {gridPosts.slice(0, 2).map((post, index) => (
                                    <div key={post.id} className={`bg-white rounded overflow-hidden shadow-lg ${index % 2 === 0 ? 'md:h-[36rem]' : 'md:h-96'}`}>
                                        <div className='p-4'>
                                            <ReactMarkdown className="text-xl mb-2">{post.heading.markdown}</ReactMarkdown>
                                            <div className='flex text-[#C52525]'>
                                                <p>{post.date}</p>
                                                <span className='mx-1'>-</span>
                                                <ReactMarkdown>{post.author.markdown}</ReactMarkdown>
                                            </div>
                                            <Link to={`/news/${post.id}`}>Læs mere</Link>
                                        </div>
                                        <img src={post.image.url} alt="" className="w-full object-cover object-center h-full" />
                                    </div>
                                ))}
                            </div>
                            {/* Bottom Row */}
                            <div className="md:col-span-1 flex flex-col gap-4">
                                {gridPosts.slice(2, 4).map((post, index) => (
                                    <div key={post.id} className={`bg-white rounded overflow-hidden shadow-lg ${index % 2 === 0 ? 'md:h-96' : 'md:h-[36rem]'}`}>
                                        <div className='p-4'>
                                            <ReactMarkdown className="text-xl mb-2">{post.heading.markdown}</ReactMarkdown>
                                            <div className='flex text-[#C52525]'>
                                                <p>{post.date}</p>
                                                <span className='mx-1'>-</span>
                                                <ReactMarkdown>{post.author.markdown}</ReactMarkdown>
                                            </div>
                                            <Link to={`/news/${post.id}`}>Læs mere</Link>
                                        </div>
                                        <img src={post.image.url} alt="" className="w-full object-cover object-center h-full" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Alternating Posts */}
                        <div className="grid grid-cols-1 gap-4 mt-4 mb-8">
                            {alternatingPosts.map((post, index) => (
                                <div key={post.id} className={`flex flex-col md:flex-row ${index % 2 === 0 ? '' : 'md:flex-row-reverse'} items-center bg-white mt-4 rounded-lg overflow-hidden shadow-lg`}>
                                    <div className="md:w-1/2">
                                        <img src={post.image.url} alt="" className="w-full h-96 object-cover object-center" />
                                    </div>
                                    <div className="md:w-1/2 p-4 flex flex-col justify-center">
                                        <ReactMarkdown className="text-xl font-bold">{post.heading.markdown}</ReactMarkdown>
                                        <ReactMarkdown>{post.shortDesc.markdown}</ReactMarkdown>
                                        <div className='flex text-[#C52525] my-2'>
                                            <p>{post.date}</p>
                                            <span className='mx-1'>-</span>
                                            <ReactMarkdown>{post.author.markdown}</ReactMarkdown>
                                        </div>
                                        <Link className='text-start' to={`/news/${post.id}`}>Læs mere</Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Text Over Image Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            {textOverImagePosts.map((post, index) => (
                                <div key={post.id} className="flex flex-col justify-between bg-white my-4 rounded-lg overflow-hidden shadow-lg">
                                    <div className="p-4">
                                        <ReactMarkdown className="text-xl mb-2">{post.heading.markdown}</ReactMarkdown>
                                        <div className='flex text-[#C52525]'>
                                            <p>{post.date}</p>
                                            <span className='mx-1'>-</span>
                                            <ReactMarkdown>{post.author.markdown}</ReactMarkdown>
                                        </div>
                                        <Link to={`/news/${post.id}`}>Læs mere</Link>
                                    </div>
                                    <img src={post.image.url} alt="" className="w-full h-48 object-cover object-center" />
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
