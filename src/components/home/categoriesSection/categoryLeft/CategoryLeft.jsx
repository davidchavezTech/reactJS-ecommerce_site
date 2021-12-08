import styles from "./CategoryLeft.module.css"

import templateImage from "./images/gym bag no bg.jpg"
const CategoryLeft = () => {
    return (
        <div className={styles.category}>
            <p className={styles.sale_text}>Sale up to 30% off</p>
            <div>
                <img src={templateImage} alt="" />
                <p style={{marginTop:30}}>Gym bags</p>
            </div>
        </div>
    )
}

export default CategoryLeft;