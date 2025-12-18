import React, { useEffect, useState } from "react";
import { assets, blog_data, comments_data } from "../../assets/icons/assets";
import { useParams } from "react-router-dom";
import Moment from "moment";
import Loader from "../../components/loder/loader";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Blog = () => {
  const { id } = useParams();
  const {axios} = useAppContext()
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const fetchedBlogData = async () => {
    try{
      const {data} = await axios.get(`/api/blog/${id}`)
      data.success ? setBlog(data.blog) : toast.error(data.message)
    }catch(error){
      toast.error(error.message)
    }
  };

  const fetchComments = async () => {
    try{
      const {data} = await axios.post('/api/blog/comments' , {blogId:id}) 
      if(data.success){
        setComments(data.comments)
      }else{
        toast.error(data.message)
      }
    }catch(error){
      toast.error(error.message)
    }
  };

  useEffect(() => {
    fetchedBlogData();
    fetchComments();
  }, []);

  const addComment = async (e) => {
    e.preventDefault();
    try{
      const {data} = await axios.post('/api/blog/add-comment' , {blog:id , name , content:comment})
      if(data.success){
        toast.success(data.message)
        setName("");
        setComment("");
        fetchComments();
      }
      else{
        toast.error(data.message)
      }
    }catch(error){
      toast.error(error.message)
    }
  };

  return blog ? (
    <div className="relative font-outfit">
      {/* Blog Header */}
      <div className="text-center mt-20 text-gray-600 px-4">
        <p className="text-primary py-4 font-medium">
          Published on {Moment(blog.createdAt).format("MMMM Do YYYY")}
        </p>

        <h1 className="text-3xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800 leading-tight">
          {blog.title}
        </h1>

        <h2
          className="my-5 max-w-xl mx-auto text-base text-gray-500"
          dangerouslySetInnerHTML={{ __html: blog.subTitle }}
        ></h2>

        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary">
          Sharvesh G
        </p>
      </div>

      {/* Blog Image + Description */}
      <div className="mx-auto max-w-5xl px-5 md:px-0 my-10">
        <img
          src={blog.image}
          alt="Blog"
          className="w-full h-auto rounded-3xl object-cover shadow-md mb-10 max-h-[600px]"
        />

        <div
          className="rich-text max-w-3xl mx-auto text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        ></div>

        {/* Comments Section */}
        <div className="mt-14 mb-10 max-w-3xl mx-auto">
          <p className="text-lg font-semibold text-gray-700 mb-4">
            Comments ({comments.length})
          </p>

          <div className="flex flex-col gap-4">
            {comments.map((item, index) => (
              <div
                key={index}
                className="relative bg-primary/5 border border-primary/10 max-w-xl p-4 rounded-xl text-gray-700"
              >
                <div className="flex items-center gap-2 mb-2">
                  <img src={assets.user_icon} alt="User" className="w-6 h-6" />
                  <p className="font-medium text-sm">{item.name}</p>
                </div>

                <p className="text-sm max-w-md ml-8 mb-1">{item.content}</p>

                <div className="text-xs ml-8 text-gray-400">
                  {Moment(item.createdAt).fromNow()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Comment Form */}
        <div className="max-w-3xl mx-auto mt-12">
          <p className="font-semibold mb-4 text-gray-700">Add your comment</p>
          <form onSubmit={addComment} className="flex flex-col gap-4 max-w-xl">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded outline-none"
            />
            <textarea
              placeholder="Write your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded outline-none h-40 resize-none"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-primary text-white rounded p-2 px-8 cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : (<Loader/>);
};

export default Blog;
