import React from "react";
import { Routes, Route } from "react-router-dom";
import Editor from "./Editor";
import Home from "./Home";
// import EditForm from "./EditForm";
// import PostDetails from "./PostDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="posts/:postId/edit" element={<EditForm />} /> */}
        {/* <Route exact path="/posts/:postId" element={<PostDetails />} /> */}
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </>
  );
}
export default App;
