import geminiMain from "../config/gemini.js";
import BLOG from "../models/Blog.js";
import COMMENT from "../models/Comments.js";

export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, image, isPublished } = req.body.blog;

    if (!title || !description || !category || isPublished === undefined) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const newBlog = new BLOG({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished
    });

    await newBlog.save();

    res.status(201).json({
      message: 'Blog created successfully'
    });
  } catch (error) {
    console.error('Error in addBlog:', error);
    res.status(500).json({ message: 'Something went wrong', error });
  }
};



export const getAllBlogs = async(req,res) => {
    try{
        const blogs = await BLOG.find({isPublished:true})
        return res.json({success:true , blogs})
    }catch(error){
        return res.json({success:false , message:error.message})
    }
}


export const getBlogById = async(req,res) =>{
    try{
        const {blogId} = req.params;
        const blog = await BLOG.findById(blogId)
        if(!blog){
            return res.json({success:false , message:"Blog Not Found By This ID"})
        }
        return res.json({success:true , blog});
    }catch(error){
<<<<<<< HEAD
        console.error('Error in getBlogById:', error);
        res.status(500).json({success:false,message:error.message})
=======
        res.json({success:true,message:error.message})
>>>>>>> 99fb45abda0df70ee507f809d114273565534de6
    }
}




export const deleteBlogById = async(req,res) =>{
    try{
        const {id} = req.body;
        await BLOG.findByIdAndDelete(id)
        await COMMENT.deleteMany({blog:id})
        return res.json({success:true , message:"BLOG Deleted Successfully"});
    }catch(error){
<<<<<<< HEAD
        console.error('Error in deleteBlogById:', error);
        res.status(500).json({success:false,message:error.message})
=======
        res.json({success:true,message:error.message})
>>>>>>> 99fb45abda0df70ee507f809d114273565534de6
    }
}


export const togglePublish = async(req,res)=>{
    try{
        const {id} = req.body;
        const blog = await BLOG.findById(id);
        blog.isPublished = !blog.isPublished;
        await blog.save();
        return res.json({success:true , message:"Blog Updated"});
    }catch(error){
        return res.json({success:false , message:error.message})
    }
}




export const addComments = async(req,res) =>{
    try{
        const {blog , name , content} = req.body;
        await COMMENT.create({blog , name , content});
        res.json({success:true , message:"Comment Added"})
    }catch(error){
        return res.json({success:false , message:error.message})
    }
}




export const getBlogComments = async(req,res) =>{
    try{
        const {blogId} = req.body;
        const comments = await COMMENT.find({blog:blogId , isApproved:true}).sort({createdAt:-1});
        return res.json({success:true, comments});
    }catch(error){
        return res.json({success:false , message:error.message})
    }
}





export const generateContent = async(req,res)=>{
    try{
<<<<<<< HEAD
        const {prompt} = req.body;
        if(!prompt) return res.status(400).json({success:false, message:'Prompt is required'});
        const content = await geminiMain(prompt + ' generate a blog content for this topic in a simple text formate');
        return res.json({success:true , content})
    }catch(error){
        console.error('Error in generateContent:', error && error.message ? error.message : error);
        return res.status(500).json({success:false , message: error.message || "Internal Server Error"})
=======
        const {prompt} = req.body
        const content = await geminiMain(prompt + ' generate a blog content for this topic in a simple text formate')
        return res.json({success:true , content})
    }catch(error){
        return res.json({success:false , message:"Internal Server Error"})
>>>>>>> 99fb45abda0df70ee507f809d114273565534de6
    }
}