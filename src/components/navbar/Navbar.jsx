import { useState, useEffect, useCallback } from "react";

//images
import burgerIcon from "./images/burger_sharp.svg";
import shoppingCartIcon from "./images/shopping_cart_icon.svg"
import profilePictureIcon from "./images/profile_image_icon.svg"
import logo from "../globalImages/toro_logo.svg"

import styles from "./Navbar.module.css"
import fonts from "../../fonts/Fonts.module.css"
const Navbar = () => {
    const [y, setY] = useState(window.scrollY);
    const handleNavigation = useCallback(
    e => {
        const window = e.currentTarget;
        // if (window.scrollY === 0) {
        //     console.log(window.scrollY)
        //     SetNavBackgroundClass("")
        // } else {
        //     console.log(window.scrollY)
        //     SetNavBackgroundClass(styles.navBackground)
        // }
        setY(window.scrollY);
    }, []
    );

    useEffect(() => {
        setY(window.scrollY);
        window.addEventListener("scroll", handleNavigation);

        return () => {
            window.removeEventListener("scroll", handleNavigation);
        };
    }, [handleNavigation]);

    return (
        <>
            <div className={styles.navbar_wrapper}>
                <div className={`${styles.navbar} ${fonts.lemon_milk_reg} ${y !==0 ? styles.navBackground : ""}`}>
                    <div className={styles.menu_button}>
                        <img src={burgerIcon} alt="" style={{width:40, height:40}} />
                        <p>MENU</p>
                    </div>
                    <img className={`${styles.navLogo} ${y !==0 ? styles.show : ""}`} src={logo} alt="Toro Logo" />
                    <div className={styles.cart_icons}>
                        <img src={shoppingCartIcon} className={styles.shopping_cart_icon} alt="" />
                        <img src={profilePictureIcon} className={styles.profile_picture_icon} alt="" />
                    </div>
                </div>
            </div>
            <div style={{height:100}}></div>
        </>
    )
}
export default Navbar;