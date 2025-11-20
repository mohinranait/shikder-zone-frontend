import { SERVER_URL } from "@/helpers/secretVariable";


/**
 * @api {get} Get all categories method
*/
export const getAllCategorys = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error fetching categories:", error);
      return { success: false, payload: [] };
    }
  };
