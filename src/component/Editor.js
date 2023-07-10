import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/index.css";
import { Link, useSearchParams } from "react-router-dom";

const Editor = () => {
  const API_URL =
    process.env.API_URL || "https://autosave-backend.onrender.com";

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postId, setPostId] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [data] = useState("");

  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("id")) {
      fetchPostDetails(searchParams.get("id"));
    }
  }, []);

  useEffect(() => {
    const autosaveTimer = setTimeout(() => {
      autosave(data);
    }, 800);

    return () => {
      clearTimeout(autosaveTimer);
    };
  });

  const autosave = async () => {
    if (postId) {
      handleUpdate();
    } else {
      handleSave();
    }
  };

  const fetchPostDetails = async (id) => {
    const response = await axios.get(`${API_URL}/api/blogPosts/${id}`);
    const blogPost = response.data.blogPost;
    setTitle(blogPost.title);
    setContent(blogPost.content);
    setPostId(blogPost._id);
    setUpdatedAt(blogPost.updatedAt);
    return;
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSave = async (e) => {
    e && e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/api/blogPosts`, {
        title,
        content,
      });
      const { _id, updatedAt } = response.data.blogPost;
      setPostId(_id);
      setUpdatedAt(updatedAt);
    } catch (error) {
      console.error("Save error", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`${API_URL}/api/blogPosts/${postId}`, {
        title,
        content,
      });

      const { updatedAt } = response.data.blogPost;
      setUpdatedAt(updatedAt);
    } catch (error) {
      console.error("Autosave Error", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex bg-blue-900 space-between justify-between text-white py-4 px-24">
        <h1>
          <Link to="/">Autosave Editor</Link>
        </h1>
        <Link to="/editor"> New Post</Link>
      </div>
      <div className="py-4 px-24">
        <Link to="/" className=" text-2xl hover:text-gray-700">
          See All Posts →
        </Link>
        <div className="bg-gray-100 p-8 mt-4">
          <h1 className="text-center text-gray-900 text-2xl font-bold mb-6">
            Blog Post Form
          </h1>
          <h2 className="text-lg text-gray-800 font-semibold ">Title</h2>
          <input
            className="block w-full h-12 p-2 text-gray-700 border border-1 border-blue-100 rounded-md hover:border-blue-300"
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter Title"
          />

          <h2 className="text-lg text-gray-800 font-semibold pt-8 ">Content</h2>
          <textarea
            defaultValue={content}
            className="block w-full p-2 border border-1 text-gray-700 border-blue-100 rounded-md hover:border-blue-300"
            rows={8}
            onChange={handleContentChange}
            placeholder="Write your content here..."
          />

          {postId ? (
            <p className="text-green-800 py-4">
              Auto saved at {new Date(updatedAt).toLocaleTimeString()}
            </p>
          ) : null}
          {/* 
          <button onClick={autosave}>Save</button> */}
        </div>
      </div>
    </div>
  );
};
export default Editor;
