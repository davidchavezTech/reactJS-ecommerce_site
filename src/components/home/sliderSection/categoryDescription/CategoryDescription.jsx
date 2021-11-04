import styles from "./CategoryDescription.module.css"
import fonts from "../../../../fonts/Fonts.module.css"

const CategoryDescription = () => {
    return (
        <div className={styles.category_description_wrapper}>
            <div className={styles.left_bar} style={{backgroundColor: "#ccc5b9"}}></div>
            <div className={`${styles.category_text_container} ${fonts.lemon_milk_reg}`} style={{color:"#ccc5b9"}}>
                <p>Boxing</p>
                <p>Punching Bag</p>
                <p>Fighting</p>
            </div>
        </div>
    )
}

export default CategoryDescription;