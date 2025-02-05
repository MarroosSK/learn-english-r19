import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useUser } from "@clerk/clerk-react";
import { getOrCreateUser } from "../api/api-calls";
import NavbarMobile from "./navbar-mobile";
import NavbarDesktop from "./navbar.desktop";

export default function Navbar() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (user) {
      getOrCreateUser(user);
    }
  }, [user]);

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white">
      <nav className="px-5  flex items-center justify-between py-1 lg:py-5">
        <NavLink to="/">
          <h2 className="text-xl font-semibold">StudyEnglish</h2>
        </NavLink>

        <NavbarDesktop
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />
        <NavbarMobile
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />
      </nav>
    </header>
  );
}
