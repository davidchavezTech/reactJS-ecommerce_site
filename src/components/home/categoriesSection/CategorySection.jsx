import Category from "./category/Category"

import styles from "./CategorySection.module.css"

const CategorySection = () => {

    return (
        <div style={{position:"relative"}} className={styles.category_container}>
            <Category />
            <Category />
            <Category />
        </div>
    )
}
export default CategorySection;