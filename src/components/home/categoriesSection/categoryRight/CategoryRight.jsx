import styles from "./CategoryRight.module.css"

import templateImage from "./images/boxing gloves category.jpg"
const CategoryRight = () => {
    return (
        <div className={styles.category}>
            <div>
                <img src={templateImage} alt="" />
                <p style={{marginTop:30}}>Boxing Gloves</p>
            </div>
            <p className={styles.sale_text}>Sale up to 30% off</p>
        </div>
    )
}

export default CategoryRight;