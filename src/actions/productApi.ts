import { SERVER_URL } from "@/helpers/secretVariable";
import { instance } from "@/hooks/useAxios";
import { TProduct } from "@/types/product.type";



/**
 * @api {get} Get all products method
*/
export const getAllProducts = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      return { success: false, payload: [] };
    }
};


/**
 * @api {get} Get all products method on the Shop page
*/
export const getAllProductsForShopPage = async ({query}:{query: URLSearchParams}) => {
    try {
      const response = await fetch(`${SERVER_URL}/user-products?${query && query.toString() }`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      return { success: false, payload: [] };
    }
};

/**
 * @api {get}  Get Single product by Slug method
*/
export const getSingleProduct = async (paramiter:string, requestBy:'slug'|'id' = 'slug') => {
    try {
      const url = requestBy === 'id' ? `${SERVER_URL}/product/${paramiter}` : `${SERVER_URL}/view-product/${paramiter}`;
        const response = await fetch(url,{
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
 * @api {patch} Update prdouct by ID
*/
export const updateProduct = async (id:string, formData:TProduct  ) => {
    const {data} = await instance.patch(`/product/${id}`,{...formData});
    return data;
}

