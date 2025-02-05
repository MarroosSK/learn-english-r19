import Hamburger from "hamburger-react";
import React, { useRef, useState } from "react";
import { useClickAway } from "react-use";
import NavbarLink from "./navbar-link";
import { NavbarLinkI } from "../types/types";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { navbarData } from "../constants/navbar-data";
import { LogIn, LogOut, User } from "lucide-react";
import { Link } from "react-router";

interface NavbarMobileI {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const NavbarMobile = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
}: NavbarMobileI) => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => setOpen(false));

  return (
    <div ref={ref} className="flex md:hidden">
      <Hamburger toggled={isOpen} toggle={setOpen} />
      {isOpen && (
        <div
          data-id="mobile-menu"
          className="fixed left-0 shadow-4xl right-0 z-[80px] top-[3.5rem] p-5 pt-0 bg-white border-b border-b-white/20"
        >
          <ul className="flex flex-col md:hidden items-center gap-2 py-5">
            {navbarData.map((link: NavbarLinkI) => (
              <div key={link.title} onClick={() => setOpen((prev) => !prev)}>
                <NavbarLink {...link} />
              </div>
            ))}
          </ul>
          <div className="flex flex-col md:hidden items-center gap-2">
            <input
              data-id="input-field"
              type="text"
              placeholder="type and press enter"
              className="px-4 py-2 rounded-md border border-stone-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
            <div className="flex items-center gap-x-2">
              <SignedOut>
                <SignInButton>
                  <button
                    className="bg-stone-800 p-2 rounded-md hover:bg-stone-300 text-white hover:text-stone-800 transition-all ease-in-out"
                    data-id="sign-in-btn"
                  >
                    <LogIn className="w-6 h-6" />
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Link
                  to={"/profile"}
                  className="bg-stone-800 p-2 rounded-md hover:bg-stone-300 text-white hover:text-stone-800 transition-all ease-in-out"
                >
                  <User />
                </Link>
                <SignOutButton>
                  <button
                    className="bg-stone-800 p-2 rounded-md hover:bg-stone-300 text-white hover:text-stone-800 transition-all ease-in-out"
                    data-id="sign-out-btn"
                  >
                    <LogOut className="w-6 h-6" />
                  </button>
                </SignOutButton>
              </SignedIn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarMobile;
