export interface IRegisterUser extends ISignInUser {
    firstName:string | null | undefined,
    lastName:string | null | undefined,
    username:string | null | undefined
}

export interface ISignInUser {
    email:string | null | undefined,
    password:string | null | undefined
}
