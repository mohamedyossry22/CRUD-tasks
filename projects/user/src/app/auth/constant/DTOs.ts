export interface CreateAccount {
    username:string,
    password:string,
    role:string,
    email:string
}

export interface Login {
    email:string,
    password:string,
    role:string,
}