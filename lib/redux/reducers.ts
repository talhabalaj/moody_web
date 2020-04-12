import { IAuth } from "../../interfaces/state/IAuth";
import { IAction } from "../../interfaces/IAction";
import { LoginActionTypes, LOGOUT_USER } from "./actions";
import { IApiError } from "../../interfaces/IApiError";
import { Reducer } from "redux";
import { IUserInfo } from "../../interfaces/user/IUserInfo";

const intialState: IAuth = {
    isLoading: false,
    isAuthenticated: false,
    user: null
}

export const auth: Reducer<IAuth, IAction<IUserInfo | IApiError | Error>> = (state = intialState, action) => {
    const { type, payload = null } = action;

    switch (type) {
        case LoginActionTypes.LOGIN_IN_PROGRESS:
            {
                const copy = { ...state };
                copy.isLoading = true;
                return copy;
            }
        case LoginActionTypes.LOGIN_SUCCESSFUL:
            {
                const copy = { ...state };
                copy.user = payload as IUserInfo;
                copy.isLoading = false;
                copy.isAuthenticated = true;
                localStorage.setItem('isAuthenticated', '1');
                return copy;
            }
        case LoginActionTypes.LOGIN_FAILED:
            {
                const copy = { ...state };
                copy.user = null;
                copy.isLoading = false;
                copy.isAuthenticated = false;
                copy.error = payload as (IApiError | Error);
                return copy;
            }
        case LOGOUT_USER:
            {
                const newState: IAuth = {
                    isAuthenticated: false,
                    isLoading: false,
                    user: null
                }

                localStorage.setItem('isAuthenticated', '0');

                return newState;
            }
    }

    return state;
}