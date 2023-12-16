import { Link } from "react-router-dom"
import { FaCartShopping } from "react-icons/fa6";

const Navbar = () => {
  return (
      <nav className=" p-5 flex justify-between" >
                
                <ul className=" ">
                    <li className=''>
                        <Link to='/' className="">
                            Home
                        </Link>
                     </li>
                </ul>
            <Link className=" " type="button" to='/cart'>
                <span className="">
            </span>
            <FaCartShopping />
            </Link>
            </nav>
  )
}

export default Navbar