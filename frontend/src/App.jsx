import React from "react";
<<<<<<< HEAD
import { Route, Routes } from "react-router-dom";
=======
import { Route, Router, Routes } from "react-router-dom";
>>>>>>> 99fb45abda0df70ee507f809d114273565534de6
import Home from "./pages/home/home";
import Blog from "./pages/blog/blog";
import Layout from "./layouts/layout";
import AdminLayout from "./layouts/adminLayout";
import Dashboard from "./pages/dsahboard/dashboard";
import AddBlog from "./pages/addBlog/addBlog";
import BlogLists from "./pages/blogLists/blogLists";
import Comments from "./pages/comments/comments";
import Login from "./pages/login/login";
import "quill/dist/quill.snow.css";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";

const App = () => {
  const {token} = useAppContext();
  return (
    <div>
      <Toaster/>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:id" element={<Blog />} />
        </Route>

        <Route path="/admin" element={token ? <AdminLayout /> : <Login />}>
          <Route index element={<Dashboard />} />
          <Route path="addblog" element={<AddBlog />} />
          <Route path="listblog" element={<BlogLists />} />
          <Route path="comments" element={<Comments />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
