import styles from "./CategoryRight.module.css"

import gloves from "./images/gloves.png"
const CategoryRight = () => {
    return (
        <div className={styles.category}>
            <div className={styles.categoryContents}>
                <div className={styles.animatedBG}>
                    <h2 className={styles.hoverTitle}>Boxing Gloves</h2>
                    <p className={styles.hoverText}>Best quality, vast variety, and all at the tip of your fingers.</p>
                    <div className={styles.button}>Take a Look</div>
                </div>
                <img src={gloves} alt="gloves category" className={styles.image} />
                <p style={{marginTop:30}}>Boxing Gloves</p>
            </div>
            <p className={styles.sale_text}>Sale up to 30% off</p>
        </div>
    )
}

export default CategoryRight;