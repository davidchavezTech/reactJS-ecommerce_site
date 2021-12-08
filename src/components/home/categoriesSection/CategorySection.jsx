import CategoryLeft from "./categoryLeft/CategoryLeft"
import CategoryRight from "./categoryRight/CategoryRight"

import styles from "./CategorySection.module.css"

const CategorySection = () => {

    return (
        <div style={{position:"relative"}} className={styles.category_container}>
            <CategoryLeft />
            <CategoryRight />
            <CategoryLeft />
        </div>
    )
}
export default CategorySection;