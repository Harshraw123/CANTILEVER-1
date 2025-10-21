import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ArrowLeft, Share2 } from "lucide-react";
import { toast, Toaster } from "sonner";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { useAuth } from "../hooks/useAuth";

const ViewBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [blog, setBlog] = useState(null);


  const currentUser=user?.user

  const getBlogDetails = async (blogId) => {
    try {
      const response = await axiosInstance.get(API_PATHS.BLOG.GET_BY_ID(blogId));
      setBlog(response?.data?.result || {});
    } catch (error) {
      console.error("Error fetching blog details:", error);
    }
  };

  useEffect(() => {
    if (id) getBlogDetails(id);
  }, [id]);

  const handleLike = async () => {
    if (!blog) return;
    try {
      const res = await axiosInstance.put(API_PATHS.BLOG.LIKE(blog._id));
      const { likesCount, likedBy } = res.data;
      
      setBlog((prev) => ({
        ...prev,
        likesCount,
        likedBy,
      }));
      
      const isLiked = likedBy?.includes(currentUser?._id);
      toast.success(isLiked ? "Post liked!" : "Like removed");
    } catch (err) {
      console.error("Like error:", err);
      toast.error("Failed to like post");
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  if (!blog) return <div className="p-8 text-center text-muted-foreground">Loading...</div>;

  return (
    <div className="min-h-screen bg-background">
      <Toaster/>
      {/* Header */}
      <div className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Card className="mb-6">
          <div className="p-6">
            {/* Blog Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="font-semibold">{blog?.author?.name || "Unknown Author"}</p>
                <p className="text-sm text-muted-foreground">
                  Posted on {blog?.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "-"}
                </p>
              </div>
              <Badge>{blog?.category || "General"}</Badge>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold mb-4">{blog?.title}</h1>

            {/* Tags */}
            {blog?.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Featured Image */}
            {blog?.featuredImage && (
              <div className="mb-6 rounded-lg overflow-hidden">
                <img src={blog.featuredImage} alt={blog.title} className="w-full h-auto" />
              </div>
            )}

            {/* Content */}
            <div
              className="prose prose-sm max-w-none mb-6"
              dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
            />

            {/* Actions */}
            <div className="flex items-center gap-4 pt-4 border-t">
              <Button
                variant={blog?.likedBy?.includes(currentUser?._id) ? "default" : "outline"}
                size="sm"
                onClick={handleLike}
                className="gap-2"
              >
                <Heart className={`h-4 w-4 ${blog?.likedBy?.includes(currentUser?._id) ? "fill-current" : ""}`} />
                {blog?.likesCount || 0} Likes
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="gap-2 ml-auto"
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ViewBlog;
