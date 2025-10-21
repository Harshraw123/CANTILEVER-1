import Blog from "../models/BlogModel.js";


// ✅ Create Blog
export const createBlog = async (req, res) => {
  try {
    const { title, content, category, tags, featuredImage, published, blogId, drafts } = req.body;

    // ✅ Validate required fields
    if (!title || !content || !blogId) {
      return res.status(400).json({ 
        success: false, 
        message: "Title, content, and blogId are required" 
      });
    }

    // ✅ Check if blog with this blogId already exists
    const existingBlog = await Blog.findOne({ blogId });
    if (existingBlog) {
      return res.status(400).json({ 
        success: false, 
        message: "Blog with this ID already exists" 
      });
    }

    const blog = new Blog({
      blogId,
      title,
      content,
      category: category || 'General',
      tags: tags || [],
      featuredImage: featuredImage || '',
      published: published === 'Yes' || published === true,
      author: req.user.id, //  req.user is set by auth middleware
    });

    const savedBlog = await blog.save();
    res.status(201).json({ success: true, blog: savedBlog });
  } catch (error) {
    console.error("Create blog error:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};




// ✅ My Blogs (for logged-in user)
export const getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ All Blogs (community page, only published)
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true })
      .populate('author', 'name') // fetch author info
      .sort({ createdAt: -1 });

    res.json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// ✅ Get Single Blog by ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id, author: req.user.id });
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get Blog by BlogId (Public Access - only published blogs)
export const getBlogByBlogId = async (req, res) => {
  try {
    const blog = await Blog.findOne({ blogId: req.params.id, published: true }).populate('author', 'name');
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.json({ success: true, result: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get Blog by BlogId for Editing (Author's own blog - published or unpublished)
export const getBlogByBlogIdForEdit = async (req, res) => {
  try {
    console.log("Get blog for edit request:", {
      blogId: req.params.id,
      userId: req.user.id
    });

    const blog = await Blog.findOne({ blogId: req.params.id, author: req.user.id });
    if (!blog) {
      console.log("Blog not found for edit");
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.json({ success: true, result: blog });
  } catch (error) {
    console.error("Get blog for edit error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Blog
export const updateBlog = async (req, res) => {
  try {
    const data = { ...req.body };
    data.published = data.published === 'yes' || data.published === true;

    console.log("Update blog request:", {
      blogId: req.params.id,
      userId: req.user.id,
      data: data
    });

    const updatedBlog = await Blog.findOneAndUpdate(
      { blogId: req.params.id, author: req.user.id }, // filter by blog and author
      data,
      { new: true, runValidators: true }
    ).populate('author', 'name');

    if (!updatedBlog) {
      return res.status(404).json({ success: false, message: "Blog not found or you don't have permission to update it" });
    }

    res.json({ success: true, blog: updatedBlog });
  } catch (error) {
    console.error("Update blog error:", error);
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid blog ID format' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};


export const toggleLike = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const userId = req.user.id; // assuming auth middleware attaches user

    const alreadyLiked = blog.likedBy.includes(userId);

    if (alreadyLiked) {
      // ✅ Unlike
      blog.likedBy = blog.likedBy.filter(id => id.toString() !== userId);
      blog.likesCount = Math.max(blog.likesCount - 1, 0);
    } else {
      // ✅ Like
      blog.likedBy.push(userId);
      blog.likesCount += 1;
    }

    await blog.save();

    return res.status(200).json({
      message: alreadyLiked ? "Unliked successfully" : "Liked successfully",
      likesCount: blog.likesCount,
      likedBy: blog.likedBy,
    });
  } catch (err) {
    console.error("Error toggling like:", err);
    return res.status(500).json({ message: "Error toggling like" });
  }
};




// ✅ Delete Blog
export const deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findOneAndDelete({
      blogId: req.params.id,
      author: req.user.id,
    });

    if (!deletedBlog) {
      return res.status(404).json({ success: false, message: "Blog not found or already deleted" });
    }

    res.json({ success: true, message: "Blog deleted successfully", blog: deletedBlog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
