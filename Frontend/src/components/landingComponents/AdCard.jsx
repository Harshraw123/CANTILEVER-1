import { ArrowRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const AdCard = () => {
  const navigate = useNavigate();
  const id=uuidv4()

  return (
    <div className="relative flex flex-col justify-between min-h-[340px] rounded-3xl bg-blue-600/90 p-8 lg:p-10 shadow-md hover:shadow-lg transition-all duration-500 overflow-hidden">
      {/* Floating Plus Icon */}
      <div className="absolute top-6 right-6">
        <div className="w-11 h-11 flex items-center justify-center rounded-full border border-white/20">
          <Plus className="w-5 h-5 text-white/40 stroke-[2]" />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-5">
        {/* Label */}
        <div className="inline-flex px-4 py-1.5 bg-white/30 backdrop-blur-md rounded-full">
          <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-white/70">
            • Blog
          </span>
        </div>

        {/* Heading and Subheading */}
        <div className="space-y-2">
          <p className="text-xs font-medium tracking-wider text-white/70 uppercase">
            Share your thoughts with the world
          </p>
          <h3 className="text-3xl lg:text-4xl font-normal leading-tight text-white tracking-tight max-w-xs">
            Start writing your first blog today
          </h3>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8">
        <Button
          onClick={() => navigate(`/create/${id}`)}
          variant="ghost"
          className="group px-0 h-auto text-[15px] font-medium text-white hover:text-white/80 hover:bg-transparent transition-all duration-300"
        >
          Create Blog
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 stroke-[2]" />
        </Button>
      </div>
    </div>
  );
};

export default AdCard;
