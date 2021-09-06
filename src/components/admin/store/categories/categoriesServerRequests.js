import axios from "axios";
import { serverAdress } from '../../../../globalVariables';

export const addCategory = async ( body ) => {
    const formData = new FormData()

    formData.append("categoryName", body.categoryName)
    formData.append("images", body.categoryImage)
    
    const { data } = await axios({
		method: "POST",
		withCredentials: true,
		url: `${serverAdress}/categories/add`,
		data: formData,
		headers: { "Content-Type": "multipart/form-data" }
  	});

    return data
}

export const getCategory = async (_id) => {{
    const { data }  = await axios({
        method: "GET",
        url: `${serverAdress}/categories/getCategory/${_id}`
    })
    return data
}}

export const getCategories = async () => {{
    const { data }  = await axios({
        method: "GET",
        url: `${serverAdress}/categories/getCategories`
    })
    return data
}}