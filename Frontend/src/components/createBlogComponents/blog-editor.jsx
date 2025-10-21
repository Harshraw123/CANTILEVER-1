"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import {
  Sparkles,
  Loader2,
  Bold,
  Italic,
  Heading2,
  List,
  ListOrdered,
  Link2,
  Undo2,
  Redo2,
} from "lucide-react"
import { toast, Toaster } from "sonner"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import LinkExtension from "@tiptap/extension-link"
import axiosInstance from '../../../utils/axiosInstance'
import { API_PATHS } from "../../../utils/apiPath"

export const BlogEditor = ({ content, setContent, title,category }) => {
  const [isGenerating, setIsGenerating] = useState(false)

  const editor = useEditor({
    extensions: [StarterKit, LinkExtension.configure({ openOnClick: false })],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class:
          "focus:outline-none min-h-[500px] px-4 py-3 text-foreground prose max-w-none",
      },
    },
  })

  const handleGenerateWithAI = async (title,category) => {
    if (!title?.trim() || !category?.trim()) {
      toast.error("Please enter both title and category first")
      return
    }

    setIsGenerating(true)
    try {
      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE,
        { title, category }
      )
      const { success, content, message } = response?.data || {}
      if (!success || !content) {
        throw new Error(message || "AI generation failed")
      }
      editor?.commands.setContent(content)
      setContent(content)
      toast.success("Content generated!")
    } catch (error) {
      console.error(error)
      toast.error(error?.response?.data?.message || error?.message || "AI generation failed")
    } finally {
      setIsGenerating(false)
    }
  }

  if (!editor) {
    return (
      <div className="flex justify-center items-center min-h-[200px] text-muted-foreground">
        Loading editor...
      </div>
    )
  }

  const toolbarButtons = [
    {
      icon: Bold,
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
      title: "Bold",
    },
    {
      icon: Italic,
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
      title: "Italic",
    },
    {
      icon: Heading2,
      action: () =>
        editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive("heading", { level: 2 }),
      title: "Heading",
    },
    {
      icon: List,
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
      title: "Bullet List",
    },
    {
      icon: ListOrdered,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
      title: "Ordered List",
    },
    {
      icon: Link2,
      action: () => {
        const url = prompt("Enter URL:")
        if (url)
          editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: url })
            .run()
      },
      isActive: editor.isActive("link"),
      title: "Link",
    },
    {
      icon: Undo2,
      action: () => editor.chain().focus().undo().run(),
      isActive: false,
      title: "Undo",
    },
    {
      icon: Redo2,
      action: () => editor.chain().focus().redo().run(),
      isActive: false,
      title: "Redo",
    },
  ]

  return (
    <div>
      <Toaster />
      <Card className="p-6 border border-border bg-background">
        <div className="flex items-center justify-between mb-4">
          <Label className="text-base font-semibold">Content</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleGenerateWithAI(title,category)}
            disabled={isGenerating}
            className="gap-2 bg-transparent"
          >
            {isGenerating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            {isGenerating ? "Generating..." : "AI Generate"}
          </Button>
        </div>

        <div className="mb-4 p-2 bg-muted rounded-lg flex flex-wrap gap-1">
          {toolbarButtons.map((btn, idx) => (
            <button
              key={idx}
              onClick={btn.action}
              title={btn.title}
              className={`p-2 rounded transition-colors ${
                btn.isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-background text-muted-foreground"
              }`}
            >
              <btn.icon className="h-4 w-4" />
            </button>
          ))}
        </div>

        <div className="border border-border rounded-lg bg-background overflow-hidden">
          <EditorContent editor={editor} style={{ minHeight: "500px" }} />
        </div>
      </Card>
    </div>
  )
}
