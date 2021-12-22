import CategoryDescription from "./categoryDescription/CategoryDescription"
import FullPageSlider from "./fullPageSlider/FullPageSlider"
import ImageSliderContainer from "./fullPageSlider/imageSliderContainer/ImageSliderContainer";

import { 
    useTransition,
    useSpring,
    useChain,
    config,
    animated,
    useSpringRef,
 } from 'react-spring';
import { useState, useEffect } from "react";
import SliderCircleSelector from "./fullPageSlider/slidersCircleSelectors/SlidersCircleSelectors";
// import useInterval from 'use-interval'

//images
import toroLogo from "../../globalImages/toro_logo.svg";

import styles from "./TopSection.module.css"
import useInterval from "use-interval";

const TopSection = () => {

    const transitionDuration = 300;
    const slideDuration = 4000;

    const textProperties = [
        {id:0, category: {sport:"Boxing", itemName:"Punchin Bag", category:"Figthing", color:"#8A7D7B"}, title:"Punching bags",text:`We have a wide variety of punching bags for all types of disciplines and levels. From different sizes, looks, and quality, you won’t have to look anywhere else.`,textColor:"black", linkColor:"black", backgroundColor: "#8A7D7B"},
        {id:1, category: {sport:"Boxing", itemName:"Gloves", category:"Figthing", color:"#F2222F"}, title:"Boxing Gloves",text:`Find the perfect fit because everyone is different. Reach your goals, pick the right weight, size and feel. Feel confident with the quality only TORO guarantees.`,textColor:"white", linkColor:"white", backgroundColor: "#F2222F"},
        {id:2, category: {sport:"Sports", itemName:"Clothing", category:"Fashion", color:"#FA922F"}, title:"Sports Clothes",text:`Who said fighters can’t look this good?
        We have a diverse collection of the highest quality to endure from the most difficutl and arduos trainning to your most important moments during a fight.`,textColor:"white", linkColor:"white", backgroundColor: "#FA922F"},
    ]
    const [slideIndex, SetSlideIndex] = useState(0);
    const [currentItem, SetItems] = useState([textProperties[slideIndex]])

    //Set up for chained animations
    const textUp_SpringRef = useSpringRef()
    const upDownFadeTransition = useTransition(currentItem, {
        ref: textUp_SpringRef,
        from: { opacity: 0, y:-20 },
        enter: { opacity: 1, y:0},
        leave: { opacity: 0, y:-20},
        config: {duration:transitionDuration/2}
        // delay: 200,
    })
    const imageSlider_SpringRef = useSpringRef()
    const dissapearToRightAnimation_transition = useTransition(currentItem, {
        ref: imageSlider_SpringRef,
        // trail: 400 / data.length,
        from: { x: -750 },
        enter: { x: 0 },
        leave: { x: 640 },
        config: {
            duration:transitionDuration,
            easing: t => Math.pow(t, 1)
        }
    })
    const slideNumber_SpringRef = useSpringRef()
    
    const dissapearToLeftAnimation_transition = useTransition(currentItem, {
        ref: slideNumber_SpringRef,
        // trail: 400 / data.length,
        from: { x: 50, opacity: 0 },
        enter: { x: 0, opacity: 1 },
        leave: { x: 50 , opacity: 0},
        config: {duration:transitionDuration/2}
    })
    const sliderBG_SpringRef = useSpringRef()
    const { backgroundColor } = useSpring({
        ref: sliderBG_SpringRef,
        from: { backgroundColor: 
            slideIndex === 0 ? textProperties[2].backgroundColor :
            slideIndex === 1 ? textProperties[1].backgroundColor :
            textProperties[0].backgroundColor
        },
        to: { backgroundColor: 
            slideIndex === 0 ? textProperties[0].backgroundColor :
            slideIndex === 1 ? textProperties[1].backgroundColor :
            textProperties[2].backgroundColor
         },
        config: {duration:transitionDuration/2}
    })

    //Function to iterate change
    const runIt = () => {
        SetItems([])
        setTimeout(()=>{
            SetSlideIndex(state => (state + 1) % textProperties.length);
            SetItems([textProperties[(slideIndex + 1) % textProperties.length]])
        },transitionDuration*2) //timeout to delay new item coming in
    }
    //This useEffect sets a timeout to reiterate "runIt" and cleans itself up once done.
    useEffect(()=>{
        const interval = setTimeout(()=>{
            runIt();
        },slideDuration) //Duration of items before disappearing
        
        return () => clearTimeout(interval);
    },[currentItem]);
    

    
    useChain([textUp_SpringRef, imageSlider_SpringRef, slideNumber_SpringRef, sliderBG_SpringRef], [0,0])

    const AnimatedCategoryDescription = animated(CategoryDescription);
    const AnimatedFullPageSlider = animated(FullPageSlider);
    return (
        <section className={styles.slider_wrapper}>

            <div className={styles.slider_logo_wrapper} onClick={()=> runIt()}>
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