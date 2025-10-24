import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ImageIcon, Loader2, X } from "lucide-react"
import { toast } from "sonner"

export const BlogMetadata = ({
  title,
  setTitle,
  category,
  setCategory,
  tags,
  setTags,
  tagInput,
  setTagInput,
  setImagePreview,
  setFeaturedImage,
}) => {
  const [isUploading, setIsUploading] = useState(false)

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "FirstCloud")
    formData.append("cloud_name", "dg4upid0d")

    try {
      setIsUploading(true)
      toast.info("Uploading image...")

      const res = await fetch("https://api.cloudinary.com/v1_1/dg4upid0d/image/upload", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      if (data.secure_url) {
        setFeaturedImage(data.secure_url)
        setImagePreview(data.secure_url)
        toast.success("Image uploaded successfully!")
      } else {
        throw new Error("Upload failed")
      }
    } catch (error) {
      console.error(error)
      toast.error("Image upload failed. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  return (
    <Card className="p-8 shadow-large border-border/50 bg-gradient-card">
      <div className="space-y-6">
        {/* Title Field */}
        <div>
          <Label htmlFor="title" className="text-base font-semibold">
            Title <span className="text-destructive">*</span>
          </Label>
          <Input
            id="title"
            placeholder="Enter an engaging title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-2 h-12 text-base"
          />
        </div>

        {/* Category Field */}
        <div>
          <Label htmlFor="category" className="text-base font-semibold">
            Category <span className="text-destructive">*</span>
          </Label>
          <Select value={category} onValueChange={setCategory} required>
            <SelectTrigger className="mt-2 h-12">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="lifestyle">Lifestyle</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="development">Development</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tags Field */}
        <div>
          <Label htmlFor="tags" className="text-base font-semibold">
            Tags <span className="text-destructive">*</span>
          </Label>
          <div className="mt-2 flex gap-2">
            <Input
              id="tags"
              placeholder="Add a tag..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
              required
              className="h-12"
            />
            <Button type="button" onClick={handleAddTag} variant="secondary" className="h-12 px-6">
              Add
            </Button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="gap-1.5 py-1.5 px-3 text-sm flex items-center"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 cursor-pointer hover:text-destructive transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <Label htmlFor="image" className="text-base font-semibold">
            Featured Image <span className="text-destructive">*</span>
          </Label>
          <p className="text-sm text-muted-foreground mt-1">
            Please upload a <span className="font-medium">compressed image</span> for faster loading.
          </p>
          <div className="mt-2">
            <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            <Button
              type="button"
              variant="outline"
              disabled={isUploading}
              className="w-full h-12 bg-transparent"
              onClick={() => document.getElementById("image")?.click()}
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Uploading...
                </>
              ) : (
                <>
                  <ImageIcon className="mr-2 h-5 w-5" /> Upload Image
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
