import { instance } from "@/hooks/useAxios";


/**
 * @api {get} Get all attributes configs method
*/
export const getAllAttributeConfigs = async () => {
    const {data} = await instance.get(`/config-attributes`);
    return data;
}


