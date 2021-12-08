import CategoryDescription from "./categoryDescription/CategoryDescription"
import FullPageSlider from "./fullPageSlider/FullPageSlider"

//images
import toroLogo from "../../globalImages/toro_logo.svg";

import styles from "./TopSection.module.css"

const TopSection = () => {
    
    return (
        <section className={styles.slider_wrapper}>
            <div className={styles.slider_logo_wrapper}>
                <img className={styles.toro_logo} src={toroLogo} alt="" />
            </div>

            <CategoryDescription />
            <FullPageSlider />
        </section>
    )
}

export default TopSection