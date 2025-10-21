import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Palette } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

// Soft editorial color palette for professional blog vibe
const colorThemes = [
  { name: "Slate", value: "#475569" },
  { name: "Teal", value: "#0d9488" },
  { name: "Rose", value: "#e11d48" },
  { name: "Amber", value: "#d97706" },
  { name: "Indigo", value: "#4338ca" },
  { name: "Emerald", value: "#047857" },
  { name: "black", value: "#0a0a0a" },
]

export const BlogPreview = ({ title, content, category, tags = [], imagePreview }) => {
  const [accent, setAccent] = useState("#0a0a0a") // default black

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Eye className="h-5 w-5" style={{ color:"black" }} />
          <h2 className="text-lg font-semibold" style={{ color: 'black' }}>
            Live Preview
          </h2>
        </div>

        {/* Professional Color Picker */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm hover:bg-muted/50 transition-colors">
              <div
                className="w-4 h-4 rounded-full border"
                style={{ backgroundColor: accent }}
              />
              <span className="text-muted-foreground">Theme</span>
              <Palette className="h-4 w-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="p-3 grid grid-cols-7 gap-3 w-auto">
            {colorThemes.map((color) => (
              <button
                key={color.name}
                onClick={() => setAccent(color.value)}
                className={cn(
                  "w-6 h-6 rounded-full transition-transform hover:scale-110 border",
                  accent === color.value && "ring-2 ring-offset-1 ring-gray-400"
                )}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Preview Card */}
      <Card className="p-8 shadow-lg border-border/50 bg-gradient-card min-h-[600px] transition-colors">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight text-foreground">
          {title || "Your title here..."}
        </h1>

        {/* Featured Image */}
        {imagePreview && (
          <img
            src={imagePreview || "/placeholder.jpg"}
            alt="Featured"
            className="w-full rounded-lg object-cover mb-8 max-h-80"
          />
        )}

        {/* Category */}
        {category && (
          <Badge
            className="mb-4 text-sm py-1.5 px-3 text-white"
            style={{ backgroundColor: accent }}
          >
            {category}
          </Badge>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-sm border-2"
                style={{
                  color: accent,
                  borderColor: accent,
                }}
              >
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Content */}
        <div
          className="prose prose-sm max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{
            __html: content || "<p><em>Your content will appear here...</em></p>",
          }}
        />
      </Card>
    </div>
  )
}
