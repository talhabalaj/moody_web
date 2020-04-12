import App from 'next/app';
import { Provider } from 'react-redux';
import { configureStore } from '../lib/store';

export default class MyApp extends App {

    render() {
        const { Component, pageProps } = this.props;
        return (
            <Provider store={configureStore()}>
                <Component {...pageProps} />
            </Provider>
        )
    }
}
