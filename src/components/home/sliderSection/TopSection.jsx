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

    const transitionDuration = 400;
    const slideDuration = 2000;

    const textProperties = [
        {id:0, category: {sport:"Boxing", itemName:"Punchin Bag", category:"Figthing", color:"#8A7D7B"}, title:"Punching bags",text:"We have a wide variety of punching bags for all types of disciplines and levels. From different sizes, looks, and quality, you won’t have to look anywhere else.",textColor:"black", linkColor:"black"},
        {id:1, category: {sport:"Boxing", itemName:"Gloves", category:"Figthing", color:"#F2222F"}, title:"Boxing Gloves",text:"Find the perfect fit because everyone is different.<br />Reach your goals, pick the right weight, size and feel.<br />Feel confident with the quality only TORO guarantees.",textColor:"white", linkColor:"white"},
        {id:2, category: {sport:"Sports", itemName:"Clothing", category:"Fashion", color:"#FA922F"}, title:"Sports Clothes",text:`Who said fighters can’t look this good?
        We have a diverse collection of the highest quality to endure from the most difficutl and arduos trainning to your most important moments during a fight.`,textColor:"white", linkColor:"white"},
    ]
    const [slideIndex, SetSlideIndex] = useState(0);
    const [items, SetItems] = useState([textProperties[slideIndex]])

    //Set up for chained animations
    const textUp_SpringRef = useSpringRef()
    const categoryDescTransition = useTransition(items, {
        ref: textUp_SpringRef,
        from: { opacity: 0, y:-20 },
        enter: { opacity: 1, y:0},
        leave: { opacity: 0, y:-20},
        config: {duration:transitionDuration/2}
        // delay: 200,
    })
    const imageSlider_SpringRef = useSpringRef()
    const dissapearToRightAnimation_transition = useTransition(items, {
        ref: imageSlider_SpringRef,
        // trail: 400 / data.length,
        from: { x: -750 },
        enter: { x: 0 },
        leave: { x: 640 },
        config: {
            duration:transitionDuration,
            easing: t => --t * t * t + 1
        }
    })
    // const imageSlider_SpringRef = useSpringRef()
    // const dissapearToRightAnimation_transition = useTransition(items, {
    //     ref: imageSlider_SpringRef,
    //     // trail: 400 / data.length,
    //     from: { x: -200 },
    //     enter: { x: 0 },
    //     leave: { x: 400 },
    //     config: {duration:transitionDuration}
    // })

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
    },[items]);
    

    
    useChain([textUp_SpringRef, imageSlider_SpringRef], [0,0])

    const AnimatedCategoryDescription = animated(CategoryDescription);
    const AnimatedFullPageSlider = animated(FullPageSlider);
    return (
        <section className={styles.slider_wrapper}>
            {/* <div className={styles.slider_logo_wrapper} onClick={()=> SetSlideIndex(state => (state + 1) % textProperties.length)}> */}
            <div className={styles.slider_logo_wrapper} onClick={()=> runIt()}>
                <img className={styles.toro_logo} src={toroLogo} alt="" />
            </div>

            {/* <animated.div style={styles1}>
                Testing!
                <animated.div style={styles2}>test 2</animated.div>
            </animated.div> */}
            

            {categoryDescTransition((style, item) => {
                return <AnimatedCategoryDescription
                    style={style} 
                    item={item}    
                />
             })} 

            <div style={{
                backgroundColor:"#8a7d7b",
                height:"55vh",
                width:"100%",
                position:"absolute",
                bottom:0}}
            >
                {categoryDescTransition((style, item) => {
                    return <FullPageSlider
                        style={style} 
                        item={item}
                    />
                })}
                <ImageSliderContainer dissapearToRightAnimation_transition={dissapearToRightAnimation_transition} />
                <SliderCircleSelector />
            </div>
            {/* <FullPageSlider /> */}
        </section>
    )
         
}
export default TopSection