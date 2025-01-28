import { Role } from "./Role"

export interface User{
    id?: number;
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
    password?: string;
    roles?: Array<Role>;
}

export interface UserDTO{
    id: number;
    username: string;
    roles: Array<Role>;
}