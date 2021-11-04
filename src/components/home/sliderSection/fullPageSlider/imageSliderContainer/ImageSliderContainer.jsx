import styles from "./ImageSliderContainer.module.css"

//images
import imageOne from "./images/guy leaning on punching bag.png"
const ImageSliderContainer = () => {


    return (
        <div className={styles.wrapper}>
            <img src={imageOne} alt="" />
        </div>
    )
}

export default ImageSliderContainer