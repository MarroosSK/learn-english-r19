import { NavLink } from "react-router";
import SupportModal from "./modals/support-modal";

const Footer = () => {
  return (
    <>
      <footer className="bg-stone-100 border-t border-gray-100 py-8">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-start lg:gap-8">
            <div className="mt-8 grid grid-cols-2 gap-8 lg:mt-0 lg:grid-cols-5 lg:gap-y-16">
              <div className="col-span-2">
                <div>
                  <NavLink to="/">
                    <h2 className="text-2xl font-bold ">StudyEnglish</h2>
                  </NavLink>

                  <p className="mt-4 text-gray-500">
                    Study English by reading articles, improving vocabulary and
                    checking grammar.
                  </p>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <p className="font-medium ">LEARN</p>

                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <NavLink
                      to="/reading"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      {" "}
                      Reading{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/vocabulary"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      {" "}
                      Vocabulaty{" "}
                    </NavLink>
                  </li>
                </ul>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <p className="font-medium ">HELP</p>

                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    {" "}
                    <SupportModal />{" "}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-100 pt-8">
            <div className="sm:flex sm:justify-between">
              <p className="text-xs text-gray-500">
                &copy; 2025. StudyEnglish. All rights reserved.
              </p>

              <ul className="mt-8 flex flex-wrap justify-start gap-4 text-xs sm:mt-0 lg:justify-end">
                <li>
                  <NavLink
                    to="/terms"
                    className="text-gray-500 transition hover:opacity-75"
                  >
                    {" "}
                    Terms & Conditions{" "}
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
