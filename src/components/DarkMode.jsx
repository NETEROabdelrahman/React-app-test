import { useState } from 'react'
import { IoSunnyOutline } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";

const DarkMode = () => {

    
    const [dark, setDark] = useState(true);
    const [icon, setIcon] = useState(<IoSunnyOutline color='#f3f3f3' />);
    
    const Changer = (e) => {
        e.preventDefault();
        setDark(!dark)
        const rootElement = document.documentElement
        if (dark) {
            setIcon(<FaMoon color='black' />)
            rootElement.style.setProperty('--dark-color', '#f3f3f3')
            rootElement.style.setProperty('--light-color', 'black')
 
        }
        else {
            setIcon(<IoSunnyOutline color='#f3f3f3' />)
            rootElement.style.setProperty('--dark-color', 'black')
            rootElement.style.setProperty('--light-color', '#f3f3f3')
       
        }
            
            
    }
        
    



    return (
        <>
            <div className='colorChanger' onClick={Changer} >
                {icon}
            </div>
        </>
    )
};

export default DarkMode