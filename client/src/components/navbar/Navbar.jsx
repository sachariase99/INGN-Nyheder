import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className='bg-white nav-blur py-4 grid grid-cols-3'>
        <Link to="/"><h3 className='text-[#C52525] text-4xl font-bold px-32'>INGN</h3></Link>
        <ul className="flex items-center">
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
  )
}

export default Navbar
