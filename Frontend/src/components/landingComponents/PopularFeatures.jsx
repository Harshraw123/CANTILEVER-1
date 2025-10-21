import React from 'react'

const PopularFeatures = () => {
  return (
    <div>
      <section className="px-8 lg:px-16  lg:py-4">
<div className="max-w-[1400px] mx-auto">
  {/* Section Header */}
  <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-16">
    <div className="flex-1">
      <div className="text-[13px] uppercase tracking-wider text-muted-foreground mb-4 font-medium">Featured Stories</div>
      <h2 className="text-5xl font-oleo font-semibold text-shadow-2xs tracking-tight italic lg:text-[64px] t text-foreground leading-[1.1]">Popular Articles</h2>
    </div>
    <div className="text-right max-w-[420px]">
   
      <p className="text-muted-foreground text-[15px] leading-relaxed">
        Curated insights and stories to inspire creativity and elevate your craft.
      </p>
    </div>
  </div>

  {/* Articles Grid */}
  <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
    {/* Featured Article */}
    <div className="space-y-7">
      <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-sm">
        <img 
          src={'/f4.avif'} 
          alt="Technology and productivity" 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="space-y-5 px-1">
        <h3 className="text-3xl lg:text-[42px] font-light text-foreground leading-[1.15]">
          The Future of Digital Creativity: Tools That Transform Your Workflow
        </h3>
        <span className="inline-block px-5 py-2.5 rounded-full bg-tag-bg text-tag-text text-[13px] font-medium tracking-wide">
          Technology
        </span>
      </div>
    </div>

    {/* Side Articles */}
    <div className="space-y-8">
      {/* Design Article */}
      <div className="flex gap-5 group cursor-pointer p-2 -m-2 rounded-2xl hover:bg-accent/30 transition-colors">
        <div className="w-40 h-40 flex-shrink-0 rounded-2xl overflow-hidden shadow-sm">
          <img 
            src={'/f3.avif'} 
            alt="Creative design workspace" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="flex-1 space-y-3 py-1">
          <h4 className="text-2xl font-light text-foreground group-hover:text-primary transition-colors leading-tight">
            Mastering Design Principles for Modern Brands
          </h4>
          <p className="text-[14px] text-muted-foreground line-clamp-2 leading-relaxed">
            Essential design strategies that create memorable brand experiences
          </p>
          <span className="inline-block px-4 py-1.5 rounded-full bg-tag-bg text-tag-text text-[12px] font-medium tracking-wide">
            Design
          </span>
        </div>
      </div>

      {/* Lifestyle Article */}
      <div className="flex gap-5 group cursor-pointer p-2 -m-2 rounded-2xl hover:bg-accent/30 transition-colors">
        <div className="w-40 h-40 flex-shrink-0 rounded-2xl overflow-hidden shadow-sm">
          <img 
            src={'/f2.avif'} 
            alt="Reading and lifestyle" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="flex-1 space-y-3 py-1">
          <h4 className="text-2xl font-light text-foreground group-hover:text-primary transition-colors leading-tight">
            Creating Your Perfect Creative Sanctuary
          </h4>
          <p className="text-[14px] text-muted-foreground line-clamp-2 leading-relaxed">
            Transform your space into an inspiring environment for deep work and creativity
          </p>
          <span className="inline-block px-4 py-1.5 rounded-full bg-tag-bg text-tag-text text-[12px] font-medium tracking-wide">
            Lifestyle
          </span>
        </div>
      </div>

      {/* Writing Article */}
      <div className="flex gap-5 group cursor-pointer p-2 -m-2 rounded-2xl hover:bg-accent/30 transition-colors">
        <div className="w-40 h-40 flex-shrink-0 rounded-2xl overflow-hidden shadow-sm">
          <img 
            src={'/f1.avif'} 
            alt="Writing and journaling" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="flex-1 space-y-3 py-1">
          <h4 className="text-2xl font-light text-foreground group-hover:text-primary transition-colors leading-tight">
            The Art of Storytelling in the Digital Age
          </h4>
          <p className="text-[14px] text-muted-foreground line-clamp-2 leading-relaxed">
            Crafting compelling narratives that resonate with modern audiences
          </p>
          <span className="inline-block px-4 py-1.5 rounded-full bg-tag-bg text-tag-text text-[12px] font-medium tracking-wide">
            Writing
          </span>
        </div>
      </div>
    </div>
  </div>
</div>
</section>
    </div>
  )
}

export default PopularFeatures
