import CategoryLeft from "./categoryLeft/CategoryLeft"
import CategoryRight from "./categoryRight/CategoryRight"

import styles from "./CategorySection.module.css"

//IMAGES
import bag from "./categoryLeft/images/bag.png"
import gloves from "./categoryRight/images/gloves.png"
import helmet from "./categoryLeft/images/helmet.png"

const CategorySection = () => {
    const categoriesArr = [
        {id:0, title:"Gym bags", text:"We now offer some of the best brands in the market with different colors and features for you to have one that adjusts to your exact needs", image:bag,color:"#DBBB7E",saleText:"SALE UP TO 30% OFF", offSetX: -100, offSetY: -10},
        {id:1, title:"Boxing Gloves", text:"Best quality, vast variety, and all at the tip of your fingers.", image:gloves,color:"#F2E9DF",saleText:"SALE UP TO 50% OFF", offSetX: 0, offSetY: 0},
        {id:2, title:"Boxing helmet", text:"Taking your training to the next level is of upmost importance and we know it, that's why we bring you a wide variety of accesories to help you achieve any goal that you set for yourself", image:helmet, color:"#F0F3FF",saleText:"", offSetX: 50, offSetY: 50},
    ]
    return (
        <div style={{position:"relative"}} className={styles.category_container}>
            {categoriesArr.map((item, index) => { 
                return index % 2 === 0 ? <CategoryLeft item={item} /> : <CategoryRight item={item} />
            })
            }
            <div>
                <div className={styles.accesoriesAccent}></div>
                <h1 className={styles.accesoriesLink}>View all<br />accesories</h1>
            </div>
        </div>
    )
}
export default CategorySection;