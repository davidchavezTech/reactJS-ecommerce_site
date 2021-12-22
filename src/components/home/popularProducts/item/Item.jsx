import styles from "./Item.module.css"
import fonts from "./../../../../fonts/Fonts.module.css"

//images
import bottle from "./images/bottle.jpg"
import pads from "./images/pads.jpg"
import kickingPads from "./images/kicking-pads.jpg"
import shorts from "./images/shorts.jpg"

const Item = ({item}) => {
    console.log(item.id)
    const image = (
        item.id === 0 ? bottle :
        item.id === 1 ? pads :
        item.id === 2 ? kickingPads :
        shorts
    )

    return <div style={{display:"flex", flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <img src={image} alt="mira bottle" />
        <p className={`${styles.desc} ${fonts.lemon_milk_reg}`}>{item.text}</p>
        <p className={styles.price}>${item.price}</p>
    </div>
}
export default Item;