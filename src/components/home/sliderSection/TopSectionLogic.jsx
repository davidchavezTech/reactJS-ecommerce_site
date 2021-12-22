import CategoryDescription from "./categoryDescription/CategoryDescription"

import { useState, useEffect } from "react";
import { 
    useTransition,
    useSpring,
    useChain,
    animated,
    useSpringRef,
 } from 'react-spring';

const TopSectionLogic = (textProperties, transitionDuration, slideDuration) => {
    
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
        },transitionDuration) //timeout to delay new item coming in
    }
    //This useEffect sets a timeout to reiterate "runIt" and cleans itself up once done.
    useEffect(()=>{
        const interval = setTimeout(()=>{
            runIt();
        },slideDuration) //Duration of items before disappearing
        
        return () => clearTimeout(interval);
    },[currentItem]); // eslint-disable-line react-hooks/exhaustive-deps
    

    
    useChain([textUp_SpringRef, imageSlider_SpringRef, slideNumber_SpringRef, sliderBG_SpringRef], [0,0])

    const AnimatedCategoryDescription = animated(CategoryDescription);


    return {
        upDownFadeTransition,
        dissapearToRightAnimation_transition,
        dissapearToLeftAnimation_transition,
        backgroundColor,
        AnimatedCategoryDescription,
        runIt,
        slideIndex,
        SetSlideIndex,
        SetItems,
    }
}
export default TopSectionLogic;