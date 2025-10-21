
import { Sparkles, Loader2, Bold, Italic, Heading2, List, ListOrdered, Link2, Undo2, Redo2 } from "lucide-react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import LinkExtension from "@tiptap/extension-link"

const editor = useEditor({
    extensions: [StarterKit, LinkExtension.configure({ openOnClick: false })],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML())
      setEditorUpdate((prev) => prev + 1)
    },
    editorProps: {
      attributes: {
        class: "focus:outline-none min-h-[500px] px-4 py-3 text-foreground",
      },
    },
  })

export const toolbarButtons = [
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
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
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
        if (url) editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
      },
      isActive: editor.isActive("link"),
      title: "Link",
    },
    { icon: Undo2, action: () => editor.chain().focus().undo().run(), isActive: false, title: "Undo" },
    { icon: Redo2, action: () => editor.chain().focus().redo().run(), isActive: false, title: "Redo" },
  ]