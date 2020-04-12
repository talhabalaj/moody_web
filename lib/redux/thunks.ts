import { Dispatch } from "redux";
import { FormEvent } from "react";
import { loginInProgress, loginSuccessful, loginFailed, logoutUser as logoutUserSuccess } from "./actions";
import { ILoginUser } from "../../interfaces/user/ILoginUser";
import { IApiRes } from "../../interfaces/IApiRes";
import { IApiError } from "../../interfaces/IApiError";
import { IUserInfo } from "../../interfaces/user/IUserInfo";
import { fetcher } from "../fetcher";
import { AxiosResponse, AxiosError } from "axios";

export const loginRequest = (event: FormEvent) =>
    async (dispatch: Dispatch) => {
        event.preventDefault();
        dispatch(loginInProgress());

        const formData = new FormData(event.currentTarget as HTMLFormElement);
        let data: ILoginUser = {
            userName: formData.get('userName') as string,
            password: formData.get('password') as string
        }

        try {
            type LoginRes = IApiRes<{ user: IUserInfo }>;

            const request: AxiosResponse<LoginRes> = await fetcher.post("http://localhost:4000/user/login", JSON.stringify(data));
            const response = request.data;

            if (response.status === 202) {
                let data = (response as LoginRes).data;
                if (data) {
                    dispatch(loginSuccessful(data.user));
                } else {
                    alert('error');
                }
            } else {
                dispatch(loginFailed(response as IApiError));
            }

        } catch (e) {
            const err: AxiosError<IApiError> = e;
            if (err.response) {
                dispatch(loginFailed(err.response.data));
            } else {
                dispatch(loginFailed(e));
            }
        }
    }

export const logoutUserRequest = () =>
    async (dispatch: Dispatch) => {
        try {
            type LoginRes = IApiRes<{ loggedOut: boolean }>;

            const request: AxiosResponse<LoginRes> = await fetcher.get("http://localhost:4000/user/logout");
            const response = request.data;

            if (response.status === 200) {
                let data = (response as LoginRes).data;
                if (data?.loggedOut) {
                    dispatch(logoutUserSuccess());
                } else {
                    alert('error');
                }
            }

        } catch (e) {
            console.error(e);
        }
    }