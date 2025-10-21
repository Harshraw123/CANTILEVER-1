import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';
dotenv.config()


const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY is not set. Please set it in your .env file.");
}


export const aiGenerateBlog = async (req, res) => {
  try {
    const { title, category } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    // Construct AI content prompt
    let aiPrompt = `
    Write only the blog content (no introductions like "Here is your blog" or "Generated content:").
    The blog should be detailed, engaging, and SEO-friendly, around 100–120 words.
    Title: "${title}"
    `
    
    if (category) aiPrompt += ` Category: ${category}.`;
    // if (keywords && keywords.length > 0) aiPrompt += ` Include the following keywords: ${keywords.join(", ")}.`;
    // if (prompt) aiPrompt += ` Additional context: ${prompt}.`;

    // Generate content using Gemini
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: aiPrompt,
    });

    const generatedContent = response.text;

    // Save blog as draft by default
    // const blog = new Blog({
    //   title,
    //   content: generatedContent,
    //   category: category || "General",
    //   tags: keywords || [],
    //   published: false, // draft by default
    //   author: req.user.id,
    // });

    // const savedBlog = await blog.save();

    res.status(201).json({ success: true, content: generatedContent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
