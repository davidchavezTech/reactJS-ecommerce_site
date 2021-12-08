import styles from "./PopularProductsSection.module.css"

//images
import img1 from "./images/img1.jpg";
import img2 from "./images/img2.jpg";
import img3 from "./images/img3.jpg";
import img4 from "./images/img4.jpg";
import img5 from "./images/img5.jpg";

const popularProductsSection = () => {
    return (
        <section>
            <h1 className={styles.title}>Brands that represent us</h1>
            <div className={styles.images}>
                <img src={img1} className={styles.logos} alt="" />
                <img src={img2} className={styles.logos} alt="" />
                <img src={img3} className={styles.logos} alt="" />
                <img src={img4} className={styles.logos} alt="" />
                <img src={img5} className={styles.logos} alt="" />
            </div>
        </section>
    )
}
export default popularProductsSection;