import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const FeatureCard = ({ date, category, title, image, className }) => {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl bg-white shadow-md hover:shadow-lg transition-all duration-500 cursor-pointer",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative h-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Cutout Image (top-right like example) */}
        <img
          src="/cutout1.png"
          alt=""
          className="absolute top-4 right-4 w-32 sm:w-44 md:w-60 lg:w-72 xl:w-80 object-contain transition-transform duration-500 group-hover:scale-105 "
        />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-between p-7 lg:p-10">
          {/* Top Badges */}
          <div className="flex flex-wrap items-center gap-3">
            {date && (
              <span className="px-5 py-2 bg-white/90 backdrop-blur-md rounded-full text-[13px] font-medium text-gray-900 tracking-wide">
                {date}
              </span>
            )}
            {category && (
              <span className="px-5 py-2 bg-white/20 border border-white/30 backdrop-blur-sm rounded-full text-[13px] font-medium text-white tracking-wide">
                • {category}
              </span>
            )}
          </div>

          {/* Bottom Content */}
      
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
