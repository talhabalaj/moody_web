import { IApiError } from "../IApiError";

export interface IAuth {
    isLoading: boolean,
    tokenInfo: IAuthInfo | null,
    error?: IApiError | Error
}

export interface IAuthInfo {
    user: string,
    isValid: boolean,
    token: string,
}