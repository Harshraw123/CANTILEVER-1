import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Search, Share2, Bookmark } from "lucide-react";
import { toast, Toaster } from "sonner";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { useAuth } from "../hooks/useAuth";

const Community = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [likingPosts, setLikingPosts] = useState(new Set());

  const currentUser = user?.user;



  // ✅ Fetch blogs
  const getAllBlogs = async () => {
    try {
      const result = await axiosInstance.get(API_PATHS.BLOG.GET_ALL);
      const allBlogs = result.data?.blogs || [];
      setBlogs(allBlogs);
      
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      setBlogs([]);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  // ✅ Filter logic
  const categories = Array.from(new Set(blogs.map((blog) => blog.category).filter(Boolean)));

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // ✅ Like handler (optimized with race condition prevention)
  const handleLike = async (e, id) => {
    e.stopPropagation();
    
    // Prevent multiple rapid clicks
    if (likingPosts.has(id)) return;
    
    try {
      setLikingPosts(prev => new Set(prev).add(id));
      

      const res = await axiosInstance.put(API_PATHS.BLOG.LIKE(id));

      const { likesCount, likedBy } = res.data;

      // Update that specific blog in state
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === id ? { ...blog, likesCount, likedBy } : blog
        )
      );
    } catch (err) {
      console.error("Like error:", err);
      toast.error("Failed to like post");
    } finally {
      setLikingPosts(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  // ✅ Share handler
  const handleShare = async (e, blogUrl) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(blogUrl);
      toast.success("Link copied to clipboard!");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  

  const handleBlogClick = (blogId) => {
    navigate(`/viewBlog/${blogId}`);
  };


  // ✅ Check if current user liked the post
  const hasUserLiked = (blog) => {
    if (!currentUser?._id || !blog.likedBy) return false;
    
    return blog.likedBy.some(
      (id) => id === currentUser._id || (typeof id === 'object' && id._id === currentUser._id)
    );
  };
  
  

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <div className="container py-6 mx-auto px-4 sm:px-6 lg:px-8 mt-22 max-w-5xl">
        <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Community
        </h1>
        <p className="text-muted-foreground text-lg">
          Discover and share knowledge with developers worldwide
        </p>
      </div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-5xl">
        {/* Search + Categories */}
        <section className="mb-12 space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 bg-muted/50 text-base"
            />
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="lg"
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="lg"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </section>

        {/* Blog List */}
        <section className="space-y-12">
          {filteredBlogs.map((blog) => (
            <article
              key={blog._id}
              className="cursor-pointer"
              onClick={() => handleBlogClick(blog.blogId)}
            >
              {/* Author Info */}
              <div className="flex items-center gap-3 mb-6">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={blog.author?.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                    {blog.author?.name?.[0] || "A"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-base">{blog.author?.name}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="secondary" className="text-xs">
                      {blog.category}
                    </Badge>
                    <span>•</span>
                    <time>{new Date(blog.createdAt).toLocaleDateString()}</time>
                  </div>
                </div>
              </div>

              {/* Blog Content */}
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-3 text-foreground">{blog.title}</h2>
                <p className="text-muted-foreground text-lg line-clamp-2">
                  {blog.content}
                </p>
              </div>

              {/* Featured Image */}
              {blog.featuredImage && (
                <div className="mb-6 overflow-hidden rounded-lg bg-muted">
                  <img
                    src={blog.featuredImage}
                    alt={blog.title}
                    className="w-full h-96 object-cover"
                  />
                </div>
              )}

              {/* Tags */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {(blog.tags || []).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-sm">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1 pt-4">
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={(e) => handleLike(e, blog._id)}
                  disabled={likingPosts.has(blog._id)}
                  className={`gap-2 ${
                    hasUserLiked(blog) ? "text-red-500" : "text-muted-foreground"
                  } ${likingPosts.has(blog._id) ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <Heart
                    className={`h-5 w-5 ${
                      hasUserLiked(blog) ? "text-red-500" : "text-muted-foreground"
                    } ${likingPosts.has(blog._id) ? "animate-pulse" : ""}`}
                    fill={hasUserLiked(blog) ? "currentColor" : "none"}
                  />
                  <span className="font-semibold">{blog.likesCount || 0}</span>
                </Button>

                <div className="flex-1" />

                <Button
                  variant="ghost"
                  size="lg"
                  onClick={(e) =>
                    handleShare(e, window.location.origin + "/viewBlog/" + blog._id)
                  }
                >
                  <Share2 className="h-5 w-5" />
                </Button>

              </div>

              <div className="mt-12 h-px bg-border" />
            </article>
          ))}
        </section>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-24">
            <p className="text-muted-foreground text-xl">
              No posts found. Try adjusting your search.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Community;
