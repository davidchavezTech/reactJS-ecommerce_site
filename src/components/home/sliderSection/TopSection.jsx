import CategoryDescription from "./categoryDescription/CategoryDescription"
import FullPageSlider from "./fullPageSlider/FullPageSlider"
import { 
    useTransition,
    useSpring,
    useChain,
    config,
    animated,
    useSpringRef,
 } from 'react-spring';
import { useState, useEffect } from "react";
// import useInterval from 'use-interval'

//images
import toroLogo from "../../globalImages/toro_logo.svg";

import styles from "./TopSection.module.css"
import useInterval from "use-interval";

const TopSection = () => {

    const transitionDuration = 150;
    const slideDuration = 2000;

    const textProperties = [
        {id:0, category: {sport:"Boxing", itemName:"Punchin Bag", category:"Figthing", color:"#8A7D7B"}},
        {id:1, category: {sport:"Boxing", itemName:"Gloves", category:"Figthing", color:"#F2222F"}},
        {id:2, category: {sport:"Boxing", itemName:"Trust", category:"Figthing", color:"#FA922F"}},
    ]
    const [slideIndex, SetSlideIndex] = useState(0);
    const [items, SetItems] = useState([textProperties[slideIndex]])

    
    const transitions = useTransition(items, {
        from: { opacity: 0, y:-15 },
        enter: { opacity: 1, y:0},
        leave: { opacity: 0, y:-15},
        config: {duration:transitionDuration}
        // delay: 200,
    })

    const runIt = () => {
        SetItems([])
        setTimeout(()=>{
            SetSlideIndex(state => (state + 1) % textProperties.length);
            SetItems([textProperties[(slideIndex + 1) % textProperties.length]])
        },transitionDuration*2) //timeout to delay new item coming in
    }

    useEffect(()=>{
        const interval = setTimeout(()=>{
            runIt();
        },slideDuration) //Duration of items before disappearing
        
        return () => clearTimeout(interval);
    },[items]);
    
    // useEffect(()=> {
    //     let timer = 
    //     return setTimeout(()=>{
    //             clearTimeout(timer)
    //         },1000);
    // },[])
    // const [ slideIndex, SetSlideIndex] = useState(0);

    // const [open, set] = useState(false)
    
    // const springApi = useSpringRef()
    // const styles1 = useSpring({
    //     ref: springApi,
    //     config: config.stiff,
    //     from: { opacity: 0 },
    //     to: {
    //         opacity: open ? 1 : 0,
    //     },
    // })
    // const springApi2 = useSpringRef()
    // const styles2 = useSpring({
    //     ref: springApi2,
    //     config: config.stiff,
    //     from: { size: '20%', opacity: 0},
    //     to: {
    //         size: open ? '100%' : '20%',
    //         opacity: open ? 1 : 0,
    //     },
    // })
    // useChain(open ? [springApi, springApi2] : [springApi2, springApi], [
    //     0,
    //     open ? 0.5 : 1,
    //   ])

    const AnimatedCategoryDescription = animated(CategoryDescription);
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
            

            {transitions((style, item) => {
                return <AnimatedCategoryDescription
                    style={style} 
                    item={item}    
                />
             })} 

            <FullPageSlider />
        </section>
    )
         
}
export default TopSection