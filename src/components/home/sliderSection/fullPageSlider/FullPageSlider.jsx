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
                <div className={styles.boxed_number_position_absolute_wrapper}>
                    <div className={styles.boxed_number_wrapper}>
                        <p className={styles.boxed_number}>01</p>
                    </div>
                </div>

                <animated.div className={styles.text} style={style}>
                    <h1>Punching bags</h1>
                    <p>We have a wide variety of punching bags for all types of disciplines and levels. From different sizes, looks, and quality, you won’t have to look anywhere else.</p>
                    <div className={`${styles.view_collection_link_wrapper} ${fonts.lemon_milk_bold}`}>
                        <span>View collection</span><img src={arrow} className={styles.triangle_arrow} alt="" />
                    </div>
                </animated.div>
            </div>

        </div>
    )
}
export default FullPageSlider