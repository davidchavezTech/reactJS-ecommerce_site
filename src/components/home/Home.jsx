//images
import ToroLogo from "../globalImages/toro_logo.svg"

import styles from "./Home.module.css"

const Home = () => {

    return (
        <div className={styles.home_logo_wrapper}>
            <img className={styles.toro_logo} src={ToroLogo} alt="" />
        </div>
    )
}

export default Home;