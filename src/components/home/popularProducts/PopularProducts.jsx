import styles from "./PopularProducts.module.css"
import fonts from "./../../../fonts/Fonts.module.css"
import Item from "./item/Item"

const PopularProducts = () => {

    const products = [
        {id:0,text: "High resistance mira water bottles", price:"25.00"},
        {id:1,text: "RDX high performance focus pads", price:"150.00"},
        {id:2,text: "Benlee Curved Thai Kick Pads", price:"250.00"},
        {id:4,text: "Venum Muay Thai Shorts", price:"120.00"}
    ]
    return (
    <section style={{paddingTop:"100px",marginBottom:"50px"}}>
        <h1 className={fonts.lemon_milk_light} style={{textAlign: "center"}}>POPULAR PRODUCTS</h1>
        <div className={styles.productsContainer}>
            {products.map(item => <Item key={item.id}item={item} />)}
        </div>
    </section>
    )
}
export default PopularProducts;