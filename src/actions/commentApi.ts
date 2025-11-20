import { SERVER_URL } from "@/helpers/secretVariable";

/**
 * @api {POST} place comment 
*/
export const placeNewComment = async (formData: {comment:string; rating:number; productId:string} ) => {
    try {
        const response = await fetch(`${SERVER_URL}/comment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials:'include',
            body: JSON.stringify(formData), 
        });

        if (!response.ok) {
            const errorText = await response.text(); 
            throw new Error(`Failed to comment: ${errorText}`);
        }

        return await response.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Error placing comment:", error.message); 
        return { success: false, payload: [] }; 
    }
};

/**
 * @api {PATCH} update comment by comment ID 
*/
export const updateCommentByCommentId = async (formData: {comment:string; rating:number; productId:string}, commentId: string ) => {
    try {
        const response = await fetch(`${SERVER_URL}/comment/${commentId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            credentials:'include',
            body: JSON.stringify(formData), 
        });

        if (!response.ok) {
            const errorText = await response.text(); 
            throw new Error(`Failed to comment: ${errorText}`);
        }

        return await response.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Error placing comment:", error.message); 
        return { success: false, payload: [] }; 
    }
};



/**
 * @api {GET} get comments by product id
*/
export const getCommentsByProductId = async (productId: string, accessMode:'public' | 'auth' | 'admin' = 'public', userId?:string) => {
    try {
        let url = `${SERVER_URL}/comments/${productId}?accessMode=${accessMode}`;
        if(userId){
            url += `&userId=${userId}`;
        }
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorText = await response.text(); 
            throw new Error(`Failed to fetch comments: ${errorText}`);
        }

        return await response.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Error fetching comments:", error.message); 
        return { success: false, payload: [] }; 
    }
};