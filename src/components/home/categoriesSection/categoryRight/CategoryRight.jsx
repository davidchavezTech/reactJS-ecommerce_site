import styles from "./CategoryRight.module.css"

// import gloves from "./images/gloves.png"
const CategoryRight = ({item}) => {
    return (
        <div className={styles.category}>
            <div className={styles.categoryContents}>
                <div className={styles.animatedBG} style={{backgroundColor: item.color}}>
                    <h2 className={styles.hoverTitle}>{item.title}</h2>
                    <p className={styles.hoverText}>{item.text}</p>
                    <div className={styles.button}>Take a Look</div>
                </div>
                <img src={item.image} alt={item.title} className={styles.image} style={{right:`${item.offSetX}px`, top: `${item.offSetY}px`}} />
                <p style={{marginTop:30}}>{item.title}</p>
            </div>
            <p className={styles.sale_text}>{item.saleText}</p>
        </div>
    )
}

export default CategoryRight;