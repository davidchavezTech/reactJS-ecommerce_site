import styles from "./SlidersCircleSelector.module.css"

const SliderCircleSelector = ({slideIndex, SetSlideIndex, textProperties, transitionDuration, SetItems}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.circle}
                style={{backgroundColor: slideIndex===0 ?  "rgba(0, 0, 0, .5)" :"rgba(0, 0, 0, .14)"}}
                onClick={e => {
                    SetItems([])
                    setTimeout(()=>{
                        SetSlideIndex(0);
                        SetItems([textProperties[0]])
                    },transitionDuration)
                }}
            ></div>
            <div className={styles.circle}
                style={{backgroundColor: slideIndex===1 ?  "rgba(0, 0, 0, .5)" :"rgba(0, 0, 0, .14)"}}
                onClick={e => {
                    SetItems([])
                    setTimeout(()=>{
                        SetSlideIndex(1);
                        SetItems([textProperties[1]])
                    },transitionDuration)
                }}
            ></div>
            <div className={styles.circle}
                style={{backgroundColor: slideIndex===2 ?  "rgba(0, 0, 0, .5)" :"rgba(0, 0, 0, .14)"}}
                onClick={e => {
                    SetItems([])
                    setTimeout(()=>{
                        SetSlideIndex(2);
                        SetItems([textProperties[2]])
                    },transitionDuration)
                }}
            ></div>
        </div>
    )
}

export default SliderCircleSelector