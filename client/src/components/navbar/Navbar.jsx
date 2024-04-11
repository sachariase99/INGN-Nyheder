import { useState } from 'react';
import { Link } from "react-router-dom"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <div className='bg-white nav-blur py-4 grid grid-cols-3 fixed top-0'>
                <Link to="/"><h3 className='text-[#C52525] text-4xl lg:text-2xl font-bold px-32'>INGN</h3></Link>
                <button className="lg:hidden block absolute top-1/2 right-32 -translate-y-1/2" onClick={() => setIsOpen(!isOpen)}>
                    <span className={`block w-7 mt-2 h-[3px] bg-black ${isOpen ? 'rotate-45 translate-y-1 transition duration-500' : 'block transition duration-500'}`}></span>
                    <span className={`block w-7 mt-2 h-[3px] bg-black ${isOpen ? 'hidden transition duration-500' : 'block transition duration-500'}`}></span>
                    <span className={`block w-7 mt-2 h-[3px] bg-black ${isOpen ? '-rotate-45 -translate-y-[6px] transition duration-500' : 'block transition duration-500'}`}></span>
                </button>
                <ul className={`${isOpen ? 'block' : 'hidden'} absolute bg-white top-[68px] rounded-lg right-32 p-2`}>
                    <span className="h-6 w-[2px] bg-black"></span>
                    <li className="text-lg px-1"><Link to="/">Alle</Link></li>
                    <span className="h-6 w-[2px] bg-black"></span>
                    <li className="text-lg px-1"><Link to="/">Indland</Link></li>
                    <span className="h-6 w-[2px] bg-black"></span>
                    <li className="text-lg px-1"><Link to="/">Udland</Link></li>
                    <span className="h-6 w-[2px] bg-black"></span>
                    <li className="text-lg px-1"><Link to="/">Teknologi</Link></li>
                    <span className="h-6 w-[2px] bg-black"></span>
                    <li className="text-lg px-1"><Link to="/">Sport</Link></li>
                    <span className="h-6 w-[2px] bg-black"></span>
                    <li className="text-lg px-1"><Link to="/">Politik</Link></li>
                    <span className="h-6 w-[2px] bg-black"></span>
                    <li className="text-lg px-1"><Link to="/">Samfund</Link></li>
                    <span className="h-6 w-[2px] bg-black"></span>
                </ul>
                <ul className="lg:flex items-center hidden">
                    <span className="h-6 w-[2px] bg-black"></span>
                    <li className="text-lg px-1"><Link to="/">Alle</Link></li>
                    <span className="h-6 w-[2px] bg-black"></span>
                    <li className="text-lg px-1"><Link to="/">Indland</Link></li>
                    <span className="h-6 w-[2px] bg-black"></span>
                    <li className="text-lg px-1"><Link to="/">Udland</Link></li>
                    <span className="h-6 w-[2px] bg-black"></span>
                    <li className="text-lg px-1"><Link to="/">Teknologi</Link></li>
                    <span className="h-6 w-[2px] bg-black"></span>
                    <li className="text-lg px-1"><Link to="/">Sport</Link></li>
                    <span className="h-6 w-[2px] bg-black"></span>
                    <li className="text-lg px-1"><Link to="/">Politik</Link></li>
                    <span className="h-6 w-[2px] bg-black"></span>
                    <li className="text-lg px-1"><Link to="/">Samfund</Link></li>
                    <span className="h-6 w-[2px] bg-black"></span>
                </ul>
            </div>

        </div>
    )
}

export default Navbar