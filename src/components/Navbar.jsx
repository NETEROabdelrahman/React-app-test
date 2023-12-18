import { Link } from 'react-router-dom';
import { FaCartShopping } from 'react-icons/fa6';
import { useGlobalContext } from '../context/Context';
import DarkMode from './DarkMode';
import { useTranslation } from 'react-i18next';
import { FaBars } from "react-icons/fa";
import { useState } from 'react';

const lngs = {
  en: { nativeName: 'English' },
  ar: { nativeName: 'عربي' }
};

const Navbar = () => {
  const { cart } = useGlobalContext();
  const { t, i18n } = useTranslation();
  const [tabOpen, setTabOpen] = useState(false);
  const [lngOpen, setlngOpen] = useState(false);


  return (
    <nav className=" p-5 flex justify-between">
      <Link to="/" className=" font-bold">
        {t('main.home')}
      </Link>
      <div className='flex flex-row gap-4 justify-between items-center'>
        <Link className=" " type="button" to="/cart">
          <span className=""></span>
          <FaCartShopping />
          <span className=" rounded-full bg-red-400 p-3">
            {cart.length}
          </span>
        </Link>
        <DarkMode />
        <div className=' relative'>

          <FaBars cursor={"pointer"} color='var(--light-color)' onClick={() => {
            setTabOpen(!tabOpen)
            if (tabOpen) {
              setlngOpen(false)
            }
          }} />
          <div className={`absolute ${tabOpen ? "flex" : "hidden"} flex-col bg-[var(--dark-color)] rounded right-0 bottom-[-85px] p-3 gap-3 transition-all`}>
            <h5 className=' cursor-pointer text-[var(--light-color)]'><Link to={"/"}>{t('main.products')}</Link></h5>
            <h5 className=' cursor-pointer text-[var(--light-color)]' onClick={() => setlngOpen(!lngOpen)}>{t('main.settings')}</h5>
          </div>
          <div className={`absolute ${lngOpen && tabOpen ? "flex" : "hidden"} flex-col bg-[var(--dark-color)] rounded right-[78px] bottom-[-120px] p-3 gap-3 transition-all`}>
            {Object.keys(lngs).map((lng) => (
              <button className=' bg-inherit text-[var(--light-color)] border-none transition-all cursor-pointer' key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
                {lngs[lng].nativeName}
              </button>
            ))}
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
