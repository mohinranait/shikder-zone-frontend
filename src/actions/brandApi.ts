import { SERVER_URL } from "@/helpers/secretVariable";

/**
 * @api {get} Get all brands method
*/
export const getAllBrands = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/brands`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", 
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch brands");
      }
  
      return await response.json();
     
    } catch (error) {
      console.error("Error fetching brands:", error);
      return { success: false, payload: [] };
    }
  };



