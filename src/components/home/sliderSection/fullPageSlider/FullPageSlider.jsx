import ImageSliderContainer from "./imageSliderContainer/ImageSliderContainer"
import CircleSelectors from "./slidersCircleSelectors/SlidersCircleSelectors"
import styles from "./FullPageSlider.module.css"
import fonts from "../../../../fonts/Fonts.module.css"

import { useSpring, animated } from 'react-spring';

//images
import arrow from "./images/triangle_arrow.svg"

const FullPageSlider = ({style, item}) => {
   
    return (
        // <div className={styles.wrapper}>
        <div>
            <div className={styles.relative_wrapper}>

                <animated.div className={styles.text} style={{...style, color:item.textColor}}>
                    <h1>{item.title}</h1>
                    <p>{item.text}</p>
                    <div className={`${styles.view_collection_link_wrapper} ${fonts.lemon_milk_bold}`}>
                        <span style={{color:item.linkColor}}>View collection</span>
                        <svg version="1.1" id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
	                        viewBox="0 0 13.2 15.8"
                            style={{width: "11px", fill: item.linkColor, marginLeft:"5px" }}
                        >
                            <polygon points="0,0 0,15.8 13.2,7.9 "/>
                        </svg>

                    </div>
                </animated.div>
            </div>

        </div>
    )
}
export default FullPageSlider