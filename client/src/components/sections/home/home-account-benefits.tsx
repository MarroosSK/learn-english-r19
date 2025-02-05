import { ArrowRight, Check } from "lucide-react";

import { SignedOut, SignInButton, useUser } from "@clerk/clerk-react";
import english from "@/assets/english.jpg";
import { NavLink } from "react-router";

import { accountBenefitsData } from "@/constants/account-benefits-data";

const HomeAccountBenefits = () => {
  const { isSignedIn } = useUser();

  return (
    <section className="py-[96px] md:px-[96px]">
      <div className="space-y-6 text-center">
        <h2 className="text-4xl font-bold tracking-tight">Account</h2>
        <p className="prose prose-base prose-zinc mt-6 text-lg leading-8 dark:prose-invert">
          Create account to get many useful benefits!
        </p>
      </div>
      <div className="flex items-center justify-center my-[40px]">
        <div className="flex md:block flex-col items-center bg-white  rounded-tl-[3rem] rounded-br-[3rem] overflow-hidden relative w-[750px] rounded-2xl  sm:order-last sm:px-8 lg:p-12">
          <img
            src={english}
            className="hidden md:flex md:w-[350px] lg:w-[400px] h-auto absolute right-4 top-5"
          />

          <div className="flex flex-col items-center md:items-start  gap-x-[8px] mb-[32px]">
            {accountBenefitsData.bullets.map((bullet: string, i: number) => {
              return (
                <div className="flex items-center gap-x-[8px]" key={i}>
                  <Check className="text-stone-800 h-4 w-4" />
                  <p className="text-gray-500">{bullet}</p>
                </div>
              );
            })}
          </div>
          {isSignedIn ? (
            <button className="bg-stone-800 text-lg px-4 py-2 rounded-md hover:bg-stone-300 text-white hover:text-stone-800 transition-all ease-in-out ">
              <NavLink
                to="/profile"
                className="text-med flex items-center gap-x-2"
              >
                Enter profile
                <ArrowRight />
              </NavLink>
            </button>
          ) : (
            <SignedOut>
              <button className="bg-stone-800 text-lg px-4 py-2 rounded-md hover:bg-stone-300 text-white hover:text-stone-800 transition-all ease-in-out">
                <SignInButton mode="modal" />
                <ArrowRight />
              </button>
            </SignedOut>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeAccountBenefits;
