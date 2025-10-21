import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EditorialPickCard = ({ image, count }) => {
  const navigate = useNavigate();

  return (
    <div
      className="group relative overflow-hidden rounded-3xl bg-gray-100 shadow-md hover:shadow-lg transition-all duration-500 cursor-pointer min-h-[420px]"
      onClick={() => navigate("/community")}
    >
      {/* Image */}
      <div className="relative h-full overflow-hidden">
        <img
          src={image}
          alt="Editorial pick"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-7 lg:p-9">
          {/* Count Badge */}
          <div className="flex justify-end">
            <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full border border-white/60 backdrop-blur-sm bg-white/10">
              <span className="text-[15px] font-medium text-white">{count}</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation(); // prevent parent click event from firing again
                navigate("/community");
              }}
              className="group/btn bg-white rounded-full px-7 py-3.5 shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300"
            >
              <span className="flex items-center gap-2 text-[15px] font-medium text-gray-800">
                See all picks
                <ArrowRight className="w-4 h-4 stroke-[2] transition-transform group-hover/btn:translate-x-1" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorialPickCard;
