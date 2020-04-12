import { NextPage } from 'next';

import Layout from "../components/Layout";
import { connect } from "react-redux";
import { loginRequest } from "../lib/redux/thunks";
import { ThunkDispatch } from "redux-thunk";
import { FormEvent } from 'react';
import { IAuth } from '../interfaces/state/IAuth';
import { RootState } from '../interfaces/state';
import { IAction } from '../interfaces/IAction';
import { useRouter } from 'next/dist/client/router';

interface LoginPageProps {
    submitForm: Function,
    auth: IAuth,
}

const LoginPage: NextPage<LoginPageProps> = ({ auth, submitForm }) => {
    const router = useRouter();

    let content = (
        <form onSubmit={(event) => submitForm(event)}>
            <div>
                <label>Username: </label>
                <input
                    type="text"
                    name="userName"
                    required
                />
            </div>
            <div>
                <label>Password: </label>
                <input
                    type="password"
                    name="password"
                    required
                />
            </div>
            {auth.error ? <div>{auth.error.message}</div> : ''}
            <button type="submit">Submit</button>
        </form>
    );

    if (auth.isLoading) {
        content = <h2>Loading</h2>
    } else if (auth.isAuthenticated) {
        content = <p>Redirecting to /profile</p>;
        router.push('/profile');
    }

    return (
        <Layout title={`Login`}>
            {content}
        </Layout>
    );
}


const mapStateToProps = (state: RootState) =>
    ({ auth: state.auth });

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, void, IAction<any>>) =>
    ({
        submitForm: (event: FormEvent) =>
            dispatch(loginRequest(event)),
    })

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);