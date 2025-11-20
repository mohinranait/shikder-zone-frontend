import { SERVER_URL } from "@/helpers/secretVariable";
import { TOrderForm } from "@/types/order.type";


/**
 * @api {post} place order 
*/
export const placeNewOrder = async (formData: TOrderForm) => {
    try {
        const response = await fetch(`${SERVER_URL}/order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData), 
        });

        if (!response.ok) {
            const errorText = await response.text(); 
            throw new Error(`Failed to order: ${errorText}`);
        }

        return await response.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Error placing order:", error.message); 
        return { success: false, payload: [] }; 
    }
};

/**
 * @api {get} Get Signle order by UID 
*/
export const getSingleOrderByUid = async (uid:string) => {
    try {
        const response = await fetch(`${SERVER_URL}/order/${uid}`,{
            method:"GET",
            headers:{
                "Content-type":"Application/json",
            },
            cache:'no-store'
        })
        if (!response.ok) {
            throw new Error("Failed to fetch order");
        }
        return await  response?.json()
    } catch (error) {
        console.error("Error fetching order:", error);
        return { success: false, payload: [] };
    }
}


/**
 * @api {get} Get all orders by Auth User
 * @param {string} userId - The ID of the user whose orders are to be fetched.
 * @returns {Promise<{ success: boolean; payload: any[] }>}
*/
export const getAllOrdersByAuthUser = async () => {
    try {
        const response = await fetch(`${SERVER_URL}/orders`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials:'include',
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error("Failed to fetch orders");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching orders:", error);
        return { success: false, payload: [] };
    }
};