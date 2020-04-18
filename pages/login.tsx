import { NextPage } from 'next';

import Layout from "../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { loginRequest } from "../lib/redux/thunks";
import { RootState } from '../interfaces/state';
import { useRouter } from 'next/dist/client/router';

const LoginPage: NextPage = () => {
    const router = useRouter();
    const auth = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    let content = (
        <form onSubmit={(event) => dispatch(loginRequest(event))}>
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


export default LoginPage;