import App from 'next/app';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { AxiosResponse } from 'axios';
import { configureStore } from '../lib/redux/store';
import { fetcher } from '../lib/fetcher';
import { IApiError } from '../interfaces/IApiError';
import { IApiRes } from '../interfaces/IApiRes';
import { loginSuccessful } from '../lib/redux/actions';
import { IUserInfo } from '../interfaces/user/IUserInfo';

export default class MyApp extends App {
    private store: Store;

    state = {
      isLoading: true,
    }

    constructor(props: any) {
      super(props);
      this.store = configureStore();
    }

    async componentDidMount() {
        type ProfileRes = IApiRes<IUserInfo>;
        if (localStorage.getItem('isAuthenticated') == '1') {
          try {
            const req: AxiosResponse<ProfileRes | IApiError> = await fetcher.get('http://localhost:4000/user/profile');
            const res = req.data;
            if (req.status === 200) {
              const { data } = res as ProfileRes;
              if (data) {
                this.store.dispatch(loginSuccessful(data));
              }
            }
          } catch (e) { }
        }

        this.setState({ isLoading: false });
    }

    render() {
      const { Component, pageProps } = this.props;
      return this.state.isLoading ? <p>Loading</p> : (
        <Provider store={this.store}>
          <Component {...pageProps} />
        </Provider>
      );
    }
}
