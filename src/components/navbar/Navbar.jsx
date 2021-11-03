//images
import burgerIcon from "./images/burger_sharp.svg";
import shoppingCartIcon from "./images/shopping_cart_icon.svg"
import profilePictureIcon from "./images/profile_image_icon.svg"

import styles from "./Navbar.module.css"
import fonts from "../../fonts/Fonts.module.css"
const Navbar = () => {


    return (
        <div className={`${styles.navbar} ${fonts.lemon_milk_reg}`}>
            <div className={styles.menu_button}>
                <img src={burgerIcon} alt="" style={{width:40, height:40}} />
                <p>MENU</p>
            </div>
            <div className={styles.cart_icons}>
                <img src={shoppingCartIcon} className={styles.shopping_cart_icon} alt="" />
                <img src={profilePictureIcon} className={styles.profile_picture_icon} alt="" />
            </div>
        </div>
    )
}
export default Navbar;