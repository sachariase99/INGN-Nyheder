import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  // Tilstand til at styre åbning og lukning af menuen
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Navigation bar */}
      <div className="bg-white nav-blur py-4 grid grid-cols-2 lg:grid-cols-3 fixed top-0 w-full z-10">
        {/* Logo og navlinks */}
        <Link to="/">
          <h3 className="text-[#C52525] text-4xl lg:text-2xl font-bold px-32">
            INGN
          </h3>
        </Link>
        {/* Menu */}
        <ul
          className={`${isOpen
              ? "absolute bg-white top-[68px] rounded-lg right-32 p-2"
              : "lg:flex items-center hidden justify-self-center"
            } `}
        >
          {/* Menu links */}
          <span className="h-6 w-[2px] bg-black"></span>
          <li className="text-lg px-1">
            <Link to="/?category=alle">Alle</Link>
          </li>
          <span className="h-6 w-[2px] bg-black"></span>
          <li className="text-lg px-1">
            <Link to="/?category=indland">Indland</Link>
          </li>
          <span className="h-6 w-[2px] bg-black"></span>
          <li className="text-lg px-1">
            <Link to="/?category=udland">Udland</Link>
          </li>
          <span className="h-6 w-[2px] bg-black"></span>
          <li className="text-lg px-1">
            <Link to="/?category=teknologi">Teknologi</Link>
          </li>
          <span className="h-6 w-[2px] bg-black"></span>
          <li className="text-lg px-1">
            <Link to="/?category=sport">Sport</Link>
          </li>
          <span className="h-6 w-[2px] bg-black"></span>
          <li className="text-lg px-1">
            <Link to="/?category=politik">Politik</Link>
          </li>
          <span className="h-6 w-[2px] bg-black"></span>
          <li className="text-lg px-1">
            <Link to="/?category=samfund">Samfund</Link>
          </li>
          <span className="h-6 w-[2px] bg-black"></span>
          </ul>
        {/* User icon and menu toggle button */}
        <div className="flex justify-self-end mr-32 items-center">
          {/* User icon */}
          <Link to="/loginPage">
            <div className="text-2xl mr-3 lg:mr-0 text-[#C52525] cursor-pointer">
              <FaUser />
            </div>
          </Link>
          {/* Menu toggle button for mobile */}
          <button
            className="lg:hidden block"
            onClick={() => setIsOpen(!isOpen)}
          >
            {/* Menu toggle icon */}
            <span
              className={`block w-7 h-[3px] bg-[#C52525] ${
                isOpen
                  ? "rotate-45 translate-y-1 transition duration-500"
                  : "block transition duration-500"
              }`}
            ></span>
            {/* Menu toggle icon */}
            <span
              className={`block w-7 mt-[6px] h-[3px] bg-[#C52525] ${
                isOpen
                  ? "hidden transition duration-500"
                  : "block transition duration-500"
              }`}
            ></span>
            {/* Menu toggle icon */}
            <span
              className={`block w-7 mt-[6px] h-[3px] bg-[#C52525] ${
                isOpen
                  ? "-rotate-45 -translate-y-[5px] transition duration-500"
                  : "block transition duration-500"
              }`}
            ></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;