import styles from "./Item.module.css"
import fonts from "./../../../../fonts/Fonts.module.css"

//images
import bottle from "./images/bottle.jpg"
import pads from "./images/pads.jpg"
import kickingPads from "./images/kicking-pads.jpg"
import shorts from "./images/shorts.jpg"

const Item = ({item}) => {
    const image = (
        item.id === 0 ? bottle :
        item.id === 1 ? pads :
        item.id === 2 ? kickingPads :
        shorts
    )

    return <div className={styles.mouseOver}style={{display:"flex", flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <img src={image} alt="mira bottle" className={styles.smoothTransition} />
        <p className={`${styles.desc} ${fonts.lemon_milk_reg}`}>{item.text}</p>
        <p className={styles.price}>${item.price}</p>
        <p className={`${fonts.lemon_milk_bold} ${styles.addToCartLink} ${styles.smoothTransition}`}>ADD TO CART</p>
    </div>
}
export default Item;