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