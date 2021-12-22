import styles from "./ImageSliderContainer.module.css"
import { animated } from "react-spring"
//images
import imageOne from "./images/guy leaning on punching bag.png"
import imageTwo from "./images/girl with boxing gloves.png"
import imageThree from "./images/girl muay thai outfit no bg.png"

const ImageSliderContainer = ({dissapearToRightAnimation_transition, slideIndex}) => {


    return (
        <div className={styles.wrapper}>
            {dissapearToRightAnimation_transition((style,item)=>{
                return <animated.img style={style} src={
                    slideIndex === 0 ? imageOne :
                    slideIndex === 1 ? imageTwo :
                    imageThree
                } alt="" />
            })}
        </div>
    )
}

export default ImageSliderContainer