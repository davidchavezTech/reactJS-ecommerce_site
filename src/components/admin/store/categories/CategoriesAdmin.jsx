import { useEffect, useState } from "react"
import CategoryForm from "./CategoryForm"
import { getCategories } from "./categoriesServerRequests"
import CategoryContainer from "./CategoryContainer"
const CategoriesAdmin = () => {
    const [categories, SetCategories] = useState([]);
    useEffect(async () => {
        const categoriesData = await getCategories()
        SetCategories(categoriesData)
    }, [])
    return (
        <>
            <CategoryForm />
            {categories.map((category, index) => <CategoryContainer key={index} category={category}/>)}
        </>
    )
}
export default CategoriesAdmin