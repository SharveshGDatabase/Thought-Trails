import React, { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/icons/assets";
import { useAppContext } from "../../context/AppContext";
import Quill from "quill";
import toast from "react-hot-toast";
import { marked } from "marked";

const AddBlog = () => {
  const { axios } = useAppContext();

  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  // Initialize Quill editor
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  // Handle image file input
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file && file.size > 10 * 1024 * 1024) {
      toast.error("Image size must be less than 10MB");
      return;
    }

    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Generate blog content using AI
  const generateContent = async () => {
    if (!title) return toast.error("Please enter the Title");
    try {
      setLoading(true);
      const { data } = await axios.post("/api/blog/generate", {
        prompt: title,
      });
      if (data.success) {
        quillRef.current.root.innerHTML = marked.parse(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to generate content");
    } finally {
      setLoading(false);
    }
  };

  // Submit new blog
  const submitHandler = async (e) => {
    e.preventDefault();
    setIsAdding(true);

    try {
      const blog = {
        title,
        subTitle,
        description: quillRef.current.root.innerHTML,
        category,
        isPublished,
        image: imageBase64 || null,
      };

      const { data } = await axios.post("/api/blog/add", { blog });

      if (data.success) {
        toast.success(data.message);
        // Reset all fields
        setTitle("");
        setSubTitle("");
        setImage(null);
        setImageBase64("");
        setCategory("Startup");
        setIsPublished(false);
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll"
    >
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">
        {/* Image Upload */}
        <p>Upload Thumbnail</p>
        <label htmlFor="image">
          <img
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            alt="Upload Preview"
            className="mt-2 h-16 rounded cursor-pointer object-cover"
          />
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
        </label>

        {/* Title */}
        <p className="mt-4">Blog Title</p>
        <input
          type="text"
          placeholder="Type here"
          required
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* SubTitle */}
        <p className="mt-4">Sub Title</p>
        <input
          type="text"
          placeholder="Type here"
          required
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
        />

        {/* Blog Content */}
        <p className="mt-4">Blog Description</p>
        <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
          <div
            ref={editorRef}
            className="min-h-[200px] relative border border-gray-300 rounded"
          >
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
                <p className="text-gray-500 text-sm">Generating...</p>
              </div>
            )}
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={generateContent}
            className="absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer"
          >
            {loading ? "Generating..." : "Generate With AI"}
          </button>
        </div>

        {/* Category */}
        <p className="mt-4">Blog Category</p>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded"
        >
          <option value="">Select Category</option>
          {blogCategories.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* Publish Now */}
        <div className="flex gap-2 mt-4">
          <p>Publish Now</p>
          <input
            type="checkbox"
            checked={isPublished}
            className="scale-125 cursor-pointer"
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isAdding}
          className="mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm"
        >
          {isAdding ? "Adding…" : "Add Blog"}
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
