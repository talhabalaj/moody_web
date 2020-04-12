import { IAction } from "../../interfaces/IAction";
import { IApiError } from "../../interfaces/IApiError";
import { IUserInfo } from "../../interfaces/user/IUserInfo";

export enum LoginActionTypes {
    LOGIN_IN_PROGRESS = "LOGIN_IN_PROGRESS",
    LOGIN_FAILED = "LOGIN_FAILED",
    LOGIN_SUCCESSFUL = "LOGIN_SUCCESSFUL"
}


export const loginInProgress = (): IAction<null> =>
    ({ type: LoginActionTypes.LOGIN_IN_PROGRESS });
export const loginSuccessful = (user: IUserInfo): IAction<IUserInfo> =>
    ({ type: LoginActionTypes.LOGIN_SUCCESSFUL, payload: user });
export const loginFailed = (error: IApiError): IAction<IApiError | Error> =>
    ({ type: LoginActionTypes.LOGIN_FAILED, payload: error });


export const LOGOUT_USER = 'LOGOUT_USER';
export const logoutUser = (): IAction<null> =>
    ({ type: LOGOUT_USER });