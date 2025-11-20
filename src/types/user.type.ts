export type TUserType = {
    _id:string;
    name: {
        firstName: string;
        lastName: string;
    };
    email: string;
    verify: {
        email: boolean;
        phone: boolean;
    };
    phone?: string;
    password: string;
    profile?: string; 
    role: "Admin" | "User" | "Manager";
    status: "Active" | "Pending" | "Banned";
    dateOfBirth?: Date;
    gender: "Male" | "Female" | "Other";
}


// Update user information type for typeScript
export type TUserUpdateType = {
    name: {
        firstName: string;
        lastName: string;
    };
    phone: string;
    dateOfBirth: Date;
    gender: string;
}