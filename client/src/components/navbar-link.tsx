import { NavLink, useLocation } from "react-router";
import { NavbarLinkI } from "../types/types";
import { cn } from "../lib/utils";

const NavbarLink = ({ ...link }: NavbarLinkI) => {
  const { pathname } = useLocation();

  return (
    <NavLink
      to={link.path}
      className={cn(
        "relative group transition duration-300 ",
        pathname === link.path && "text-stone-800 font-bold"
      )}
    >
      {link.title}
      <span className="text-stone-800 absolute top-0 left-1/2 w-0 h-0.5 bg-current transition-all duration-500 group-hover:left-0 group-hover:w-1/2"></span>
      <span className="text-stone-800 absolute top-0 right-1/2 w-0 h-0.5 bg-current transition-all duration-500 group-hover:right-0 group-hover:w-1/2"></span>
    </NavLink>
  );
};

export default NavbarLink;
