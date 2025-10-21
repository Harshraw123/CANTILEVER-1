import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    blogId:{
      type:String,
      required:true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // assuming you have a User model
      required: true,
    },
    category: {
      type: String,
      default: 'General',
    },
    tags: {
      type: [String],
      default: [],
    },
    featuredImage: {
      type: String, // URL of image
    },
    published: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
    },
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    likesCount: {
      type: Number,
      default: 0,
    },
  
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        content: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
  }
);

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default Blog;
