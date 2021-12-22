
import FullPageSlider from "./fullPageSlider/FullPageSlider"
import ImageSliderContainer from "./fullPageSlider/imageSliderContainer/ImageSliderContainer";
import TopSectionLogic from "./TopSectionLogic";
import { animated } from 'react-spring';
import SliderCircleSelector from "./fullPageSlider/slidersCircleSelectors/SlidersCircleSelectors";
// import useInterval from 'use-interval'

//images
import toroLogo from "../../globalImages/toro_logo.svg";

import styles from "./TopSection.module.css"

const TopSection = () => {

    const textProperties = [
        {id:0, category: {sport:"Boxing", itemName:"Punchin Bag", category:"Figthing", color:"#8A7D7B"}, title:"Punching bags",text:`We have a wide variety of punching bags for all types of disciplines and levels. From different sizes, looks, and quality, you won’t have to look anywhere else.`,textColor:"black", linkColor:"black", backgroundColor: "#8A7D7B"},
        {id:1, category: {sport:"Boxing", itemName:"Gloves", category:"Figthing", color:"#F2222F"}, title:"Boxing Gloves",text:`Find the perfect fit because everyone is different. Reach your goals, pick the right weight, size and feel. Feel confident with the quality only TORO guarantees.`,textColor:"white", linkColor:"white", backgroundColor: "#F2222F"},
        {id:2, category: {sport:"Sports", itemName:"Clothing", category:"Fashion", color:"#FA922F"}, title:"Sports Clothes",text:`Who said fighters can’t look this good?
        We have a diverse collection of the highest quality to endure from the most difficutl and arduos trainning to your most important moments during a fight.`,textColor:"white", linkColor:"white", backgroundColor: "#FA922F"},
    ]

    const transitionDuration = 300;
    const slideDuration = 4000;

    const {
        upDownFadeTransition,
        dissapearToRightAnimation_transition,
        dissapearToLeftAnimation_transition,
        backgroundColor,
        AnimatedCategoryDescription,
        runIt,
        slideIndex,
        SetSlideIndex,
        SetItems
    } = TopSectionLogic(textProperties, transitionDuration, slideDuration);

    return (
        <section className={styles.slider_wrapper}>

            <div className={styles.slider_logo_wrapper}>
                <img className={styles.toro_logo} src={toroLogo} alt="" />
            </div>

            {upDownFadeTransition((style, item) => {
                return <AnimatedCategoryDescription
                    style={style} 
                    item={item}    
                />
             })} 

            <animated.div style={{
                backgroundColor: backgroundColor,
                height:"55vh",
                width:"100%",
                position:"absolute",
                bottom:0}}
            >
                <div className={styles.boxed_number_position_absolute_wrapper}>
                    <div className={styles.boxed_number_wrapper}>
                        {dissapearToLeftAnimation_transition((style, item)=> {
                            return <animated.p className={styles.boxed_number} style={style}>{`0${item.id+1}`}</animated.p>
                        })}
                    </div>
                    
                </div>
                
                {upDownFadeTransition((style, item) => {
                    return <FullPageSlider
                        style={style} 
                        item={item}
                    />
                })}

                <ImageSliderContainer dissapearToRightAnimation_transition={dissapearToRightAnimation_transition} slideIndex={slideIndex} />
                
                <SliderCircleSelector slideIndex={slideIndex} SetSlideIndex={SetSlideIndex} SetItems={SetItems} textProperties={textProperties} transitionDuration={transitionDuration} />
                
            </animated.div>
        </section>
    )
         
}
export default TopSection