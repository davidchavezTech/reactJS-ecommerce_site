import styles from "./PopularProducts.module.css"
import fonts from "./../../../fonts/Fonts.module.css"

//components
import Item from "./item/Item"

//functions
import { useEffect, useRef, useState } from "react"
import { useTransition, animated } from "react-spring"

const PopularProducts = () => {
    
    const [products, SetProducts] = useState([])
    

    const productContainerRef = useRef(null)

    const appearUpTransitions = useTransition(products, {
        from: { opacity: 0, y:-20 },
        enter: { opacity: 1, y:0},
        leave: { opacity: 0, y:-20},
        config: {duration:250},
        trail: 200
        // delay: 200,
    })

    useEffect(()=>{
        const options = {
            // threshold:0.1
            rootMargin:"-250px"
        }
        const observer = new IntersectionObserver((entries, observer)=>{
            entries.forEach(entry=>{
                if(entry.isIntersecting===true){
                    observer.disconnect() //stop it after first "reveal on scroll"
                    SetProducts([
                        {id:0,text: "High resistance mira water bottles", price:"25.00"},
                        {id:1,text: "RDX high performance focus pads", price:"150.00"},
                        {id:2,text: "Benlee Curved Thai Kick Pads", price:"250.00"},
                        {id:4,text: "Venum Muay Thai Shorts", price:"120.00"}
                    ])
                } 
            });
        }, options);
        observer.observe(productContainerRef.current);

        
    }, [])

    // const AnimatedItem = animated(Item);
    return (
    <section style={{paddingTop:"100px",marginBottom:"50px"}}>
        <h1 className={fonts.lemon_milk_light} style={{textAlign: "center"}}>POPULAR PRODUCTS</h1>
        <div className={styles.productsContainer} ref={productContainerRef}>
        {appearUpTransitions((style, item) => {
            return (
                <animated.div style={style}>
                    <Item key={item.id} item={item}  />
                </animated.div>
            )
        })}

        </div>
    </section>
    )
}
export default PopularProducts;