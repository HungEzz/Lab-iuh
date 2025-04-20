import { CiBookmark } from "react-icons/ci";
import { CiTimer } from "react-icons/ci";

export function Recipe({item}){
    return (
    <div className="flex flex-col rounded-lg overflow-hidden shadow hover:shadow-lg transition-all duration-300 bg-white h-full">
        <div className="relative overflow-hidden group">
            <img 
                src={item.img} 
                className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                alt={item.name}
            />
            <div className="absolute top-3 right-3">
                <button 
                    className="p-2 bg-[var(--pink)] bg-opacity-90 text-white rounded-full shadow transition-all duration-300 hover:bg-opacity-100 focus:outline-none"
                    aria-label="Save recipe"
                >
                    <CiBookmark size={20} />
                </button>
            </div>
        </div>
        <div className="flex flex-col p-5 flex-grow">
            <h3 className="text-gray-800 text-xl font-bold mb-3 line-clamp-2 text-left">
                {item.name}
            </h3>
            <div className="mt-auto pt-2">
                <div className="flex items-center gap-1">
                    <CiTimer className="text-[var(--pink)]" size={20} />
                    <span className="text-[var(--pink)] font-medium">{item.time} minutes</span>
                </div>
            </div>
        </div>
    </div>
    )
} 