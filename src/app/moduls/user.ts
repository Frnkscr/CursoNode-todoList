export interface User {
    firstName?: string,
    lastName?: string,
    secondLastNAme?: string,
    username?: string,
    email?:string,
    password?:string
}

export interface AuthToken{
        token: "string";
        expires: "string";
}