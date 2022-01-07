import { useEffect, useState } from "react"
import CategoryForm from "./CategoryForm"
import { getCategories } from "./categoriesServerRequests"
import CategoryContainer from "./CategoryContainer"
const CategoriesAdmin = () => {
    const [categories, SetCategories] = useState([]);

    const handleNewCategory = async () => {
        const categoriesData = await getCategories()
        SetCategories(categoriesData)
    }
    useEffect(() => handleNewCategory(), [])
    return (
        <>
            <CategoryForm onNewCategory={handleNewCategory} />
            {categories.map((category, index) => <CategoryContainer key={Date.now() + index} category={category}/>)}
        </>
    )
}
export default CategoriesAdmin