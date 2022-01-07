import axios from "axios";
import { serverAdress } from '../../../../globalVariables';

export const addCategory = async ( body ) => {
    const formData = new FormData()

    formData.append("categoryName", body.categoryName)
    formData.append("images", body.categoryImage)
    
    const response = await axios({
		method: "POST",
		withCredentials: true,
		url: `${serverAdress}/categories/add`,
		data: formData,
		headers: { "Content-Type": "multipart/form-data" }
  	});
      console.log(response)
    return response.data ? response.data : response;
}

export const getCategory = async (_id) => {
    const { data }  = await axios({
        method: "GET",
        url: `${serverAdress}/categories/getCategory/${_id}`
    })
    return data
}

export const getCategories = async () => {
    const { data }  = await axios({
        method: "GET",
        url: `${serverAdress}/categories/getCategories`
    })
    return data
}

export const deleteCategory = async (data) => {
    const { response }  = await axios({
        method: "DELETE",
        url: `${serverAdress}/categories/deleteCategory/${data.id}`,
        data: {imageURL: data.imageURL}
    })
    return response
}
export const editCategory = async ( id, body ) => {
    const formData = new FormData()
    console.log(id, body)
    
    const {categoryImage, categoryName, subcategories, _imageToBeDeletedURL } = body
    console.log(categoryImage, categoryName, subcategories)
    formData.append("_id", id)
    formData.append("categoryName", categoryName)
    formData.append("image", categoryImage)
    if(_imageToBeDeletedURL) formData.append("imageToBeDeletedURL", _imageToBeDeletedURL)
    if(subcategories) formData.append("subcategories", subcategories)
    const response = await axios({
		method: "POST",
		withCredentials: true,
		url: `${serverAdress}/categories/edit`,
		data: formData,
		headers: { "Content-Type": "multipart/form-data" }
  	});
    console.log(response)
    return response.data ? response.data : response;
}