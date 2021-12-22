import TopSection from "./sliderSection/TopSection"
import Categories from "./categoriesSection/CategorySection"
import Brands from "./brands/Brands"
import Footer from "./footer/Footer"
import PopularProducts from "./popularProducts/PopularProducts"
const Home = () => {

    return (
        <>
            <TopSection />
            <Categories />
            <PopularProducts />
            <Brands />
            <Footer />
        </>
    )
}

export default Home;