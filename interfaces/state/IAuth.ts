import { IApiError } from "../IApiError";
import { IUserInfo } from "../user/IUserInfo";

export interface IAuth {
    isLoading: boolean,
    isAuthenticated: boolean,
    user: IUserInfo | null
    error?: IApiError | Error
}

