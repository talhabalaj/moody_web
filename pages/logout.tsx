import { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserRequest } from "../lib/redux/thunks";
import { RootState } from "../interfaces/state";
import { useRouter } from "next/dist/client/router";

const LogoutPage: NextPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const auth = useSelector((state: RootState) => state.auth)

    if (auth.isAuthenticated) {
        dispatch(logoutUserRequest());
        router.push('/');
        return <p>logging out..</p>
    } else {
        router?.push('/');
        return <p>Not logged in...</p>
    }



}

export default LogoutPage;