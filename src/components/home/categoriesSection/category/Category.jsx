import styles from "./Category.module.css"

import templateImage from "./images/gym bag no bg.jpg"
const Category = () => {
    return (
        <div className={styles.category}>
            <img src={templateImage} alt="" />
            <p style={{marginTop:30}}>Gym bags</p>
        </div>
    )
}

export default Category;