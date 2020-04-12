import { IAuth, IAuthInfo } from "../interfaces/state/IAuth";
import { IAction } from "../interfaces/IAction";
import { LoginActionTypes } from "./actions";
import { IApiError } from "../interfaces/IApiError";
import { Reducer } from "redux";

const intialState: IAuth = {
    isLoading: false,
    tokenInfo: null
}

export const auth: Reducer<IAuth, IAction<IAuthInfo | IApiError | Error>> = (state = intialState, action) => {
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
                copy.tokenInfo = payload as IAuthInfo;
                copy.isLoading = false;
                return copy;
            }
        case LoginActionTypes.LOGIN_FAILED:
            {
                const copy = { ...state };
                copy.tokenInfo = null;
                copy.isLoading = false;
                copy.error = payload as (IApiError | Error);
                return copy;
            }
    }

    return state;
}