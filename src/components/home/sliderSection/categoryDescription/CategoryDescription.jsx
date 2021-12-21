import styles from "./CategoryDescription.module.css"
import fonts from "../../../../fonts/Fonts.module.css"

const CategoryDescription = ({style,item}) => {
    return (
        <div className={styles.category_description_wrapper} style={style}>
            <div className={styles.left_bar} style={{backgroundColor: item.category.color}}></div>
            <div className={`${styles.category_text_container} ${fonts.lemon_milk_reg}`} style={{color: item.category.color}}>
                <p>{item.category.sport}</p>
                <p>{item.category.itemName}</p>
                <p>{item.category.category}</p>
            </div>
        </div>
    )
}

export default CategoryDescription;