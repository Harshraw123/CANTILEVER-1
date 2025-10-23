"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import axiosInstance from "../../utils/axiosInstance"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Heart, MoreVertical, Pencil, Trash2, Search, FileText, Calendar } from "lucide-react"
import { toast } from "sonner"
import { API_PATHS } from "../../utils/apiPath"
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import { useAuth } from "../hooks/useAuth"

const Loader = () => (
  <div className="space-y-4">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="h-24 bg-muted rounded-lg animate-pulse"></div>
    ))}
  </div>
)

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [likedBlogs, setLikedBlogs] = useState({})
  const navigate = useNavigate()
  const { user } = useAuth()
  const id = uuidv4()
  const currentUser = user?.user

  const handleDelete = async (blogId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this blog?")
      if (!confirmDelete) return
      await axiosInstance.delete(API_PATHS.BLOG.DELETE(blogId))
      setBlogs((prev) => prev.filter((blog) => blog.blogId !== blogId))
      toast.success("Blog deleted successfully!")
    } catch (error) {
      console.error("Error deleting blog:", error)
      toast.error("Failed to delete the blog. Please try again.")
    }
  }

  const getMyBlogs = async () => {
    try {
      setLoading(true)
      const result = await axiosInstance.get(API_PATHS.BLOG.GET_MY_ALL)
      const myBlogs = result.data?.blogs || []
      setBlogs(myBlogs)
      
      // Initialize liked blogs state based on current user's likes
      const likedState = {}
      myBlogs.forEach(blog => {
        if (blog.likedBy && blog.likedBy.length > 0 && currentUser?._id) {
          // Check if current user has liked this blog
          const hasUserLiked = blog.likedBy.some(
            (id) => id === currentUser._id || (typeof id === 'object' && id._id === currentUser._id)
          )
          likedState[blog.blogId] = hasUserLiked
        }
      })
      setLikedBlogs(likedState)
    } catch (error) {
      console.error("Error fetching blogs:", error)
      toast.error("Failed to load blogs")
      setBlogs([])
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async (e, id) => {
    e.stopPropagation();
  
    // If already liked, stop (optional)
    if (likedBlogs[id]) return;
  
    try {
      // Optimistic UI update
      setLikedBlogs(prev => ({ ...prev, [id]: true }));
  
      const res = await axiosInstance.put(API_PATHS.BLOG.LIKE(id));
      const { likesCount, likedBy } = res.data;
  
      setBlogs(prevBlogs =>
        prevBlogs.map(blog =>
          blog._id === id ? { ...blog, likesCount, likedBy } : blog
        )
      );
    } catch (err) {
      console.error("Like error:", err);
      toast.error("Failed to like post");
  
      // Revert optimistic update if failed
      setLikedBlogs(prev => ({ ...prev, [id]: false }));
    }
  };
  


  const hasUserLiked = (blog) => {
    if (!currentUser?._id || !blog.likedBy) return false;
    
    return blog.likedBy.some(
      (id) => id === currentUser._id || (typeof id === 'object' && id._id === currentUser._id)
    );
  };

  useEffect(() => {
    getMyBlogs()
  }, [])

  const filteredAndSortedBlogs = blogs
    .filter((blog) => {
      const matchesSearch =
        blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.content?.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || blog.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt)
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt)
        case "mostLiked":
          return (b.likesCount || 0) - (a.likesCount || 0)
        default:
          return 0
      }
    })

  const totalStats = {
    totalBlogs: blogs.length,
    published: blogs.filter((b) => b.status === "published").length,
    totalLikes: blogs.reduce((sum, b) => sum + (b.likesCount || 0), 0),
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-30 max-w-7xl">
        <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-2">My Blogs</h1>
            <p className="text-lg text-muted-foreground">Manage and track your blog posts</p>
          </div>
          <Button
            onClick={() => navigate(`/create/${id}`)}
            className="h-12 px-8 text-base font-semibold md:w-fit w-full"
          >
            <Pencil className="mr-2 h-5 w-5" />
            Create New Blog
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <Card className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-950/10">
            <p className="text-sm font-medium text-muted-foreground mb-3">Total Blogs</p>
            <p className="text-4xl font-bold">{totalStats.totalBlogs}</p>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-950/10">
            <p className="text-sm font-medium text-muted-foreground mb-3">Published</p>
            <p className="text-4xl font-bold">{totalStats.published}</p>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-950/10">
            <p className="text-sm font-medium text-muted-foreground mb-3">Total Likes</p>
            <p className="text-4xl font-bold">{totalStats.totalLikes}</p>
          </Card>
        </div>

        <Card className="p-6 mb-10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-11"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px] h-11">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Drafts</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[180px] h-11">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="mostLiked">Most Liked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {loading ? (
          <Loader />
        ) : filteredAndSortedBlogs.length > 0 ? (
          <div className="space-y-4">
            {filteredAndSortedBlogs.map((blog, index) => (
              <Card
                key={blog._id}
                className="group overflow-hidden hover:shadow-md transition-all duration-300 border-border/50"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex flex-col md:flex-row">
                  {blog.featuredImage && (
                    <div className="md:w-48 md:h-40 flex-shrink-0 overflow-hidden bg-muted">
                      <img
                        src={blog.featuredImage}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Badge variant={blog.status === "published" ? "default" : "secondary"}>
                            {blog.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(blog.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => navigate(`/create/${blog.blogId}`)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDelete(blog.blogId)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <h3 className="text-xl font-bold mb-2 line-clamp-2">{blog.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{blog.content}</p>

                      {blog.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {blog.tags.slice(0, 4).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-4 pt-4 border-t border-border">
                      <div
                 onClick={(e) => handleLike(e, blog._id)}
                        className="flex items-center gap-2 cursor-pointer select-none transition-transform hover:scale-110"
                      >
                        <Heart
                          className={`h-5 w-5 ${
                            hasUserLiked(blog) ? "text-red-500 fill-red-500" : "text-muted-foreground"
                          }`}
                        />
                        <p className="text-sm font-medium">{blog.likesCount || 0}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-16 text-center">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-lg text-muted-foreground mb-6">
              No blogs found. Start creating your first blog post!
            </p>
            <Button size="lg" onClick={() => navigate(`/create/${id}`)}>
              Create Your First Blog
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}

export default MyBlogs
