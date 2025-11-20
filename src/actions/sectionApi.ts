import { instance } from "@/hooks/useAxios";

/**
 * @api {get} Get all sections method
*/
export const getAllSections = async () => {
    const {data} = await instance.get(`/sections?accessBy=user`);
    return data;
}