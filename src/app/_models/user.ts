import { Role } from "./role";

export class User {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    passWord: string;
    role: Role;
    token?: string;
}