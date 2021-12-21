import styles from "./ImageSliderContainer.module.css"
import { animated } from "react-spring"
//images
import imageOne from "./images/guy leaning on punching bag.png"
const ImageSliderContainer = ({dissapearToRightAnimation_transition}) => {


    return (
        <div className={styles.wrapper}>
            {dissapearToRightAnimation_transition((style,item)=>{
                return <animated.img style={style} src={imageOne} alt="" />
            })}
        </div>
    )
}

export default ImageSliderContainer