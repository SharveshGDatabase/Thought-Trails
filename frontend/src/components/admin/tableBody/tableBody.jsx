import React from 'react';
import { assets } from '../../../assets/icons/assets';
import { useAppContext } from '../../../context/AppContext';
import toast from 'react-hot-toast';

const TableBody = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt, isPublished } = blog;
  const blogDate = new Date(createdAt);

  const {axios} = useAppContext();

  const deleteBlog = async()=>{
    try{
      const {data} = await axios.post('/api/blog/delete' , {id:blog._id})
      if(data.success){
        toast.success(data.message)
        fetchBlogs()
      }else{
        toast.error(data.message)
      }
    }catch(error){
      toast.error(error.message)
    }
  }

  const togglePublish = async() =>{
    try{
      const {data} = await axios.post('/api/blog/toggle-publish' , {id:blog._id})
      if(data.success){
        toast.success(data.message)
        fetchBlogs()
      }else{
        toast.error(data.message)
      }
    }catch(error){
      toast.error(error.message)
    }
  }

  return (
    <tr className="border-y border-gray-300">
      <td className="px-2 py-4">{index}</td>
      <td className="px-2 py-4">{title}</td>
      <td className="px-2 py-4 max-sm:hidden">{blogDate.toDateString()}</td>
      <td className="px-2 py-4 max-sm:hidden">
        <p className={isPublished ? "text-green-600" : "text-orange-700"}>
          {isPublished ? "Published" : "Unpublished"}
        </p>
      </td>

      <td className="px-2 py-4">
        <div className="flex items-center gap-3 text-xs">
          <button className="border px-2 py-0.5 rounded cursor-pointer" onClick={togglePublish}>
            {isPublished ? "Unpublish" : "Publish"}
          </button>
          <img
            src={assets.cross_icon}
            onClick={deleteBlog}
            className="w-6 hover:scale-110 transition-all cursor-pointer"
            alt="Delete"
          />
        </div>
      </td>
    </tr>
  );
};

export default TableBody;
