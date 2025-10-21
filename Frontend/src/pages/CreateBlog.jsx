"use client";

import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { BlogMetadata } from "../components/createBlogComponents/blog-metadata";
import { BlogEditor } from "../components/createBlogComponents/blog-editor";
import { BlogActions } from "../components/createBlogComponents/blog-action";
import { BlogPreview } from "../components/createBlogComponents/blog-preview";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";

const CreateBlog = () => {
  const { id: blogId } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const [hasCreatedBefore, setHasCreatedBefore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSavedData = async () => {
      if (!blogId) return;

      try {
        const res = await axiosInstance.get(API_PATHS.BLOG.GET_BY_ID(blogId));

        // Check if blog exists
        const fetchedData = res.data?.result;

fetchedData
        if (fetchedData) {
          setHasCreatedBefore(true); // ✅ Blog already exists
          setTitle(fetchedData.title || "");
          setContent(fetchedData.content || "");
          setCategory(fetchedData.category || "");
          setTags(fetchedData.tags || []);
          setFeaturedImage(fetchedData.featuredImage || "");
          setImagePreview(fetchedData.featuredImage||'')
        } else {
          setHasCreatedBefore(false);
        }
      } catch (error) {
        // If error = 404, blog not found → new blog
        if (error.response?.status === 404) {
          setHasCreatedBefore(false);
        } else {
          console.error("Error fetching blog:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    getSavedData();
  }, [blogId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-muted-foreground">
        Loading blog editor...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-10 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-3">
            {hasCreatedBefore ? "Edit Blog Post" : "Create New Blog Post"}
          </h1>
          <p className="text-muted-foreground text-lg">
            {hasCreatedBefore
              ? "Update your existing blog post"
              : "Share your thoughts with the world"}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          {/* Editor Section */}
          <div className="space-y-6 animate-fade-in">
            <BlogMetadata
              title={title}
              setTitle={setTitle}
              category={category}
              setCategory={setCategory}
              tags={tags}
              setTags={setTags}
              tagInput={tagInput}
              setTagInput={setTagInput}
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
              setFeaturedImage={setFeaturedImage}
            />

            <BlogEditor content={content} setContent={setContent} title={title} category={category} />

            <BlogActions
              title={title}
              content={content}
              category={category}
              tags={tags}
              featuredImage={featuredImage}
              blogId={blogId}
              hasCreatedBefore={hasCreatedBefore}
            />
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-24 lg:h-fit animate-fade-in">
            <BlogPreview
              title={title}
              content={content}
              category={category}
              tags={tags}
              imagePreview={imagePreview}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
