import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="bg-white nav-blur py-4 grid grid-cols-2 lg:grid-cols-3 fixed top-0 w-full">
        <Link to="/">
          <h3 className="text-[#C52525] text-4xl lg:text-2xl font-bold px-32">
            INGN
          </h3>
        </Link>
        <ul
          className={`${
            isOpen
              ? "absolute bg-white top-[68px] rounded-lg right-32 p-2"
              : "lg:flex items-center hidden justify-self-center"
          } `}
        >
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
        <div className="flex justify-self-end mr-32 items-center">
          <div className="text-2xl mr-3 lg:mr-0 text-[#C52525] cursor-pointer">
            <FaUser />
          </div>
          <button
            className="lg:hidden block"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span
              className={`block w-7 h-[3px] bg-[#C52525] ${
                isOpen
                  ? "rotate-45 translate-y-1 transition duration-500"
                  : "block transition duration-500"
              }`}
            ></span>
            <span
              className={`block w-7 mt-[6px] h-[3px] bg-[#C52525] ${
                isOpen
                  ? "hidden transition duration-500"
                  : "block transition duration-500"
              }`}
            ></span>
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
