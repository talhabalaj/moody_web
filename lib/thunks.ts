import { Dispatch } from "redux";
import { FormEvent } from "react";
import fetch from 'isomorphic-unfetch';
import { loginInProgress, loginSuccessful, loginFailed } from "./actions";
import { ILoginUser } from "../interfaces/user/ILoginUser";

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
            const response: any = await (await fetch('http://localhost:4000/user/login', {
                method: 'post',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })).json();

            if (response.status === 202) {
                dispatch(loginSuccessful(response?.data?.tokenInfo));
            } else {
                dispatch(loginFailed(response));
            }

        } catch (e) {
            dispatch(loginFailed(e));
        }
    }