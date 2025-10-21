import { useNavigate } from "react-router-dom"
import { ContainerStagger, ContainerAnimated } from "../../../utils/gallery-grid-utils.jsx"
import { GalleryGrid, GalleryGridCell } from "./gallery-grid"
import { Button } from "@/components/ui/button"

const IMAGES = [
"https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
  "https://images.unsplash.com/photo-1733680958774-39a0e8a64a54?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1548783307-f63adc3f200b?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1703622377707-29bc9409aaf2?q=80&w=2400&auto=format&fit=crop&ixlib=rb-4.0.3",
]

export default function AboutDemo() {
  const navigate=useNavigate()
  return (
    <section className="bg-white">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-8 py-20 md:grid-cols-2">
        <ContainerStagger>
          <ContainerAnimated className="mb-4 block text-xs font-medium text-rose-500 md:text-sm uppercase tracking-wide">
            Empower Your Voice
          </ContainerAnimated>

          <ContainerAnimated className="text-4xl font-semibold tracking-tight md:text-[2.6rem] text-gray-900 leading-tight">
            Craft. Publish. Inspire. <br /> Build Your Blog Brand.
          </ContainerAnimated>

          <ContainerAnimated className="my-4 text-base text-slate-700 md:my-6 md:text-lg leading-relaxed">
            At <span className="font-semibold text-gray-900">MindCast</span>, we believe every story deserves to be heard.
            Our modern blogging platform helps creators, writers, and thinkers share
            their ideas beautifully — with powerful tools for editing, publishing, and growing your audience.
            <br /><br />
            Whether you write about technology, design, travel, or personal growth, 
            our platform gives you the creative freedom to focus on what truly matters — your voice.
          </ContainerAnimated>

          <ContainerAnimated>
            <div className="flex flex-col sm:flex-row gap-4">
            
              <Button onClick={()=>navigate('/community')} variant="outline" className="rounded-xl px-6 py-5 border-rose-500 text-rose-600 hover:bg-rose-50">
                Explore Blogs
              </Button>
            </div>
          </ContainerAnimated>
        </ContainerStagger>

        <GalleryGrid>
          {IMAGES.map((imageUrl, index) => (
            <GalleryGridCell key={index} index={index}>
              <ContainerAnimated>
                <img
                  src={imageUrl}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover object-fit rounded-2xl  hover:scale-[1.03] transition-transform duration-300 ease-out"
                />
              </ContainerAnimated>
            </GalleryGridCell>
          ))}
        </GalleryGrid>
      </div>
    </section>
  )
}
