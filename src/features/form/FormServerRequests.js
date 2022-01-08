import axios from "axios";

export const getRequest = async (url, val) => {
    const { data }  = await axios({
        method: "GET",
        url: `${url}${val}`
    })
    return data
}
