import React, { useRef, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import CtmShip from "../../components/chip/chip";
import BlogList from "../../components/blogList/blogList";
import BlogCard from "../../components/blogCard/blogCard";
import { useAppContext } from "../../context/AppContext";

const Home = () => {
  const [menu, setMenu] = useState("All");
  const { blogs, input , setInput } = useAppContext();

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      input === "" ||
      blog.title.toLowerCase().includes(input.toLowerCase()) ||
      blog.category.toLowerCase().includes(input.toLowerCase());

    const matchesMenu = menu === "All" || blog.category === menu;

    return matchesSearch && matchesMenu;
  });

  return (
    <div>
      <CtmShip text="New : AI Integrated" />

      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center text-black/65 font-semibold">
        Your own <span className="text-primary">blogging</span> platform.
      </h1>

      <p className="my-6 sm:my-8 max-w-2xl mx-auto text-xs sm:text-sm text-gray-500 text-center">
        This is your space to think out loud, to share what matters, and to
        write without filters. Whether it's one word or a thousand, your story
        starts right here.
      </p>

      <form
        className="flex justify-between items-center max-w-lg mx-auto 
                   border border-gray-300 bg-white rounded overflow-hidden 
                   max-sm:scale-90 px-2 transition-all"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search for blogs"
          className="w-full pl-4 py-4 outline-none text-sm"
        />
      </form>

      <BlogList menu={menu} setMenu={setMenu} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
        {filteredBlogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
      <div className="flex  justify-center">
        {input && <button onClick={()=>setInput("")} className="text-primary bg-primary/20 px-4 py-2 rounded border-1 border-primary text-xs cursor-pointer" >Clear Search</button>}
      </div>
    </div>
  );
};

export default Home;
