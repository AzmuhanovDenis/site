import { useState, useEffect } from 'react';
import './header.scss';

function Header() {
    const themeKey = "";

    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem(themeKey) === "enabled";
    });

    useEffect(() => {
        if (isDark) {
            document.body.classList.add("darkTheme");
            localStorage.setItem(themeKey, "enabled");
        } else {
            document.body.classList.remove("darkTheme");
            localStorage.setItem(themeKey, "disabled");
        }
    }, [isDark]); 

    const toggleTheme = () => {
        setIsDark(!isDark);
    };

    return (
        <div className="header-block">
            <div className="ellipse-btn-block">
                <button className="btn-darkTheme" onClick={toggleTheme}></button>
            </div>
        </div>
    );
}

export default Header;
