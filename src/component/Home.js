import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/index.css";

const API_URL = process.env.API_URL || "http://localhost:5000";

const Home = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    const response = await axios.get(`${API_URL}/api/blogPosts`);
    const blogPosts = response.data.blogPosts;
    setBlogPosts(blogPosts);
  };

  const handleDelete = async (postId) => {
    console.log(postId, "post id");
    try {
      await axios.delete(`${API_URL}/api/blogPosts/${postId}`);

      setBlogPosts((prevPosts) =>
        prevPosts.filter((post) => post._id !== postId)
      );
      console.log("Post deleted successfully");
    } catch (error) {
      console.log("Error deleting post:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex bg-blue-900 space-between justify-between text-white py-4 px-24">
        <h1>Autosave Editor</h1>
        <Link to="/editor"> New Post</Link>
      </div>

      <div className="max-w-7xl mx-auto py-4 px-24">
        {blogPosts.map((post, i) => {
          return (
            <div className="bg-gray-100 p-4 rounded-md mb-4" key={i}>
              <div>
                <h2 className="text-2xl text-gray-800 font-semibold pb-2">
                  Title: {post.title}
                </h2>
                <p className="text-lg font-normal text-gray-700 pb-2">
                  Content: {post.content}
                  {/* Content: <Link to={`/posts/${post._id}`}>{post.content}</Link> */}
                </p>
              </div>
              <div className="">
                <button className="bg-blue-800 text-white hover:bg-blue-600 py-1 px-6 rounded-md mr-2">
                  <Link to={`/editor?id=${post._id}`}>Edit</Link>
                  {/* <Link to="/editor">Edit</Link> */}
                </button>
                <button
                  className="bg-red-800 text-white hover:bg-red-600 py-1 px-6 rounded-md"
                  onClick={() => handleDelete(post._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
