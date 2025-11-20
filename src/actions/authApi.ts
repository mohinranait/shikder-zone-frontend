import { TRegisterType } from "@/components/forms/RegisterForm";
import { TVerifyEmailType } from "@/components/forms/VerifyForm";
import { instance } from "@/hooks/useAxios";
import { TUserUpdateType } from "@/types/user.type";

/**
 * Create new user
*/
export const userRegister = async (formData:TRegisterType) => {
    const {data} = await instance.post(`/user/create`, { ...formData  });
    return data;
}

/**
 * User login method
*/
export const userLogin = async (formData:{email:string;password:string}) => {
    const {data} = await instance.post(`/user/login`, { ...formData  });
    return data;
}
/**
 * User information update method
*/

export const userUpdate = async (formData:TUserUpdateType, userId:string) => {
    const {data} = await instance.patch(`/user/${userId}`, { ...formData  });
    return data;
}


/**
 * Change passwrod By UserID for authenticated user
*/
export const changePassword = async (formData:{password:string;userId:string;oldPassword:string}) => {
    const {data} = await instance.patch(`/change-password?accessBy=user`,{...formData});
    return data;
}



/**
 * User logout method
*/
export const userLogout = async () => {
    const {data} = await instance.post(`/user/logout`);
    return data;
}

/**
 * @api {post} user -> Verify user email 
*/
export const verifyEmailAccount = async (formData:TVerifyEmailType) => {
    const {data} = await instance.post(`/user`,{...formData});
    return data;
}

/**
 * @api {post} user -> Forgot password
*/
export const forgotPassword = async (email: string) => {
    const {data} = await instance.post(`/forgot-password`,{email});
    return data;
}

/**
 * @api {post} user -> Verify forgot email
*/
export const forgotEmailVerify = async (formData:{code:string; token: string}) => {
    const {data} = await instance.post(`/forgot-email-verify`,{...formData});
    return data;
}


/**
 * Change passwrod from forgot page
*/
export const changeForgotPassword = async (formData:{password:string;token:string}) => {
    const {data} = await instance.post(`/change-password`,{...formData});
    return data;
}