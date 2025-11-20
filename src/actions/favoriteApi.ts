import { SERVER_URL } from "@/helpers/secretVariable";

/**
 * @method {POST}
 * @params {userId, psotId} 
 * create a new favorite
*/
export const addFavoriteProduct = async ({userId,product}:{userId:string;product:string}) => {
    try {
        const response = await fetch(`${SERVER_URL}/favorite`,{
            method:"POST",
            headers:{
                "Content-type":"Application/json",
            },
            body: JSON.stringify({userId,product}),
            credentials: 'include',
        })
        if (!response.ok) {
            throw new Error("Failed to create favorite");
        }
        return  await  response?.json()
       
    } catch (error) {
        console.error("Error create favorite:", error);
        return { success: false, payload: [] };
    }
}


/**
 * @method {GET}
 * Get all vavorites by authenticated user
*/
export const getAllFavoriteProducts = async () => {
    try {
        const response = await fetch(`${SERVER_URL}/favorites`,{
            method:"GET",
            headers:{
                "Content-type":"Application/json",
            },
            credentials: 'include',
        })
        if (!response.ok) {
            throw new Error("Failed to get favorites");
        }
        return  await  response?.json()
       
    } catch (error) {
        console.error("Error get favorite:", error);
        return { success: false, payload: [] };
    }
}


/**
 * @method {DELETE}
 * Delete favorite by favoriteID
*/
export const deleteFavoriteById = async ({favoriteId, userId}:{favoriteId:string; userId:string}) => {
    try {
        const response = await fetch(`${SERVER_URL}/favorite/${favoriteId}/${userId}`,{
            method:"DELETE",
            headers:{
                "Content-type":"Application/json",
            },
            credentials: 'include',
        })
        if (!response.ok) {
            throw new Error("Failed to delete favorites");
        }
        return  await  response?.json()
       
    } catch (error) {
        console.error("Error delete favorite:", error);
        return { success: false, payload: [] };
    }
}
