import { Link } from 'react-router-dom';
import { FaCartShopping } from 'react-icons/fa6';
import { useGlobalContext } from '../context/Context';
import DarkMode from './DarkMode';

const Navbar = () => {
  const { cart } = useGlobalContext();

  return (
    <nav className=" p-5 flex justify-between">
      <DarkMode/>
      <ul className=" ">
        <li className="">
          <Link to="/" className=" font-bold">
            Home
          </Link>
        </li>
      </ul>
      <Link className=" " type="button" to="/cart">
        <span className=""></span>
        <FaCartShopping />
        <span className=" rounded-full bg-red-400 p-3">
          {cart.length}
        </span>
      </Link>
    </nav>
  );
};

export default Navbar;
