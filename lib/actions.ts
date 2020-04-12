import { IAction } from "../interfaces/IAction";
import { IAuthInfo } from "../interfaces/state/IAuth";
import { IApiError } from "../interfaces/IApiError";

export enum LoginActionTypes {
    LOGIN_IN_PROGRESS = "LOGIN_IN_PROGRESS",
    LOGIN_FAILED = "LOGIN_FAILED",
    LOGIN_SUCCESSFUL = "LOGIN_SUCCESSFUL"
}

export const loginInProgress = (): IAction<null> =>
    ({ type: LoginActionTypes.LOGIN_IN_PROGRESS });
export const loginSuccessful = (token: IAuthInfo): IAction<IAuthInfo> =>
    ({ type: LoginActionTypes.LOGIN_SUCCESSFUL, payload: token })
export const loginFailed = (error: IApiError): IAction<IApiError | Error> =>
    ({ type: LoginActionTypes.LOGIN_FAILED, payload: error })    