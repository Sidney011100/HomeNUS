export interface User {
    email: string;
    userId: string;
    roles: Roles;
    name: string;
}

export interface Roles {
    member?: boolean;
    admin?: boolean;
}