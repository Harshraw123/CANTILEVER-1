import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPath";

export const BlogActions = ({ title, content, category, featuredImage, tags, hasCreatedBefore, blogId }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handlePublish = async () => {
    // ✅ Validate required fields
    if (!title.trim() || !content.trim() || !category.trim() || !tags?.length) {
      toast.error("All fields are required!");
      return;
    }

    // ✅ Use consistent blogId - prefer the one from URL params
    const currentBlogId = id || blogId;
    
    if (!currentBlogId) {
      toast.error("Blog ID is missing!");
      return;
    }

    try {
      const blogData = {
        blogId: currentBlogId,
        title,
        content,
        category,
        featuredImage,
        published: true,
        tags,
      };

      let result;
      if (hasCreatedBefore) {
        // ✅ Update existing blog
        const editUrl = API_PATHS.BLOG.EDIT(currentBlogId);
        result = await axiosInstance.put(editUrl, {
          title,
          content,
          category,
          featuredImage,
          published: true,
          tags,
        });

        const updatedBlog = result.data.blog;
        toast.success("Blog updated successfully!");
      } else {
        // ✅ Create new blog
        result = await axiosInstance.post(API_PATHS.BLOG.CREATE, {
          blogId: currentBlogId,
          title,
          content,
          category,
          featuredImage,
          published: true,
          tags,
        });

        const publishedBlog = result?.data || {};
        toast.success("Blog published successfully!");
      }

      // ✅ Navigate after success
      setTimeout(() => navigate("/my-blogs"), 1000);
    } catch (error) {
      console.error("Error publishing blog:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
      const errorMessage =
        error.response?.data?.message || "Failed to publish blog. Please try again.";
      toast.error(errorMessage);
    }
  };



  return (
    <div className="flex gap-4">
      <Toaster />
      <Button
        type="button"
        onClick={handlePublish}
        className="flex-1 h-12 text-base font-semibold"
      >
        {hasCreatedBefore ? "Update" : "Publish"}
      </Button>
    </div>
  );
};
