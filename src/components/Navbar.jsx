import { Link } from 'react-router-dom';
import { FaCartShopping } from 'react-icons/fa6';
import { useGlobalContext } from '../context/Context';
import DarkMode from './DarkMode';
import { useTranslation } from 'react-i18next';

const lngs = {
  en: { nativeName: 'English' },
  ar: { nativeName: 'عربي' }
};

const Navbar = () => {
  const { cart } = useGlobalContext();
  const { t, i18n } = useTranslation()


  return (
    <nav className=" p-5 flex justify-between">
      <Link to="/" className=" font-bold">
        {t('main.home')}
      </Link>
      <div className=' basis-1/6 flex flex-row justify-between items-center'>
        <div>
          {Object.keys(lngs).map((lng) => (
            <button className=' bg-inherit text-[var(--light-color)] border-none transition-all cursor-pointer' key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
              {lngs[lng].nativeName}
            </button>
          ))}
        </div>
        <Link className=" " type="button" to="/cart">
          <span className=""></span>
          <FaCartShopping />
          <span className=" rounded-full bg-red-400 p-3">
            {cart.length}
          </span>
        </Link>
        <DarkMode />

      </div>
    </nav>
  );
};

export default Navbar;
