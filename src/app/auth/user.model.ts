export interface User {
    email: string;
    userId: string;
    roles: Roles;
}

export interface Roles {
    member?: boolean;
    admin?: boolean;
}