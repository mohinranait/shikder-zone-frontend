import { SERVER_URL } from "@/helpers/secretVariable";
import { instance } from "@/hooks/useAxios";

/**
 * @api {get} Get all attributes method
*/
export const getAllAttributes = async () => {
    try {
        const response = await fetch(`${SERVER_URL}/attributes`,{
            method:"GET",
            headers:{
                "Content-type":"Application/json",
            },
            cache:'no-store'
        })
        if (!response.ok) {
            throw new Error("Failed to fetch product");
        }
        return await  response?.json()
    } catch (error) {
        console.error("Error fetching product:", error);
        return { success: false, payload: [] };
    }
}

/**
 * @api {get} Get single attributes BY ID
*/
export const getSingleAttributes = async (id:string) => {
    const {data} = await instance.get(`/attribute/${id}`);
    return data;
}


