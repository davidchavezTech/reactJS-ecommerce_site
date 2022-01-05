import styles from "./CategoryLeft.module.css"

const CategoryLeft = ({item}) => {
    return (
        <div className={styles.category}>
            <p className={styles.sale_text}>{item.saleText}</p>
            <div className={styles.categoryContents}>
                <div className={styles.animatedBG}  style={{backgroundColor: item.color}}>
                    <h2 className={styles.hoverTitle}>{item.title}</h2>
                    <p className={styles.hoverText}>{item.text}</p>
                    <div className={styles.button}>Take a Look</div>
                </div>
                <img src={item.image} alt={item.title} className={styles.image} style={{right:`${item.offSetX}px`, top: `${item.offSetY}px`}} />
                <p style={{marginTop:30}}>{item.title}</p>
            </div>

            

        </div>
    )
}

export default CategoryLeft;