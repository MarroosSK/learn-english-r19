import { NavLink } from "react-router";
import { categories } from "@/constants/categories-data";

const ReadingTabs = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 py-12">
      {categories.map((category) => (
        <NavLink
          key={category.path}
          to={category.path}
          className="relative group w-full h-full"
        >
          <img
            src={category.img}
            className="w-full h-full object-cover"
            alt={`Reading ${category.label}`}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gray-700 bg-opacity-50 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-3xl font-bold">{category.label}</p>
            <p className="mt-2 text-center px-4">{category.description}</p>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default ReadingTabs;
