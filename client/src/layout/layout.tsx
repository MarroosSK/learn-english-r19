import { useEffect, useLayoutEffect, useState } from "react";
import { Outlet } from "react-router";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

import { ArrowUp } from "lucide-react";

import Credentials from "../components/credentials";
import { useUser } from "@clerk/clerk-react";
import { cn } from "@/lib/utils";
import { useScrollTop } from "@/hooks/use-scroll-top";

export const Layout = () => {
  const { isSignedIn } = useUser();
  const { isScrolled } = useScrollTop();
  const [isVisible, setIsVisible] = useState(false);

  //scroll
  const handleTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (isScrolled) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isScrolled]);

  useLayoutEffect(() => {
    window.scroll({ top: 0, behavior: "auto" });
  }, []);

  return (
    <div className="relative">
      <Navbar />
      <main id="layout-main" className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <button
        onClick={handleTop}
        className={cn(
          "z-[40] p-3 bg-stone-800 text-lg rounded-full hover:bg-stone-300 text-white hover:text-stone-800 transition-all ease-in-out",
          isVisible ? "fixed" : "hidden",
          isSignedIn ? "bottom-4 right-4" : "bottom-[5rem] right-4"
        )}
      >
        <ArrowUp />
      </button>
      {!isSignedIn && (
        <div className="fixed bottom-4 right-4 z-[40]">
          <Credentials />
        </div>
      )}
    </div>
  );
};
