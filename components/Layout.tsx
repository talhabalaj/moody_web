import * as React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useSelector } from 'react-redux'
import { RootState } from '../interfaces/state'

type Props = {
  title?: string
}

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = 'This is the default title',
}) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return (
    <div>
      <style jsx>{`
        a:not(:last-child) {
          margin-right: 10px;
        }
      `}
      </style>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>
          {isAuthenticated && <Link href="/profile">
            <a>Profile</a>
          </Link>}
          {!isAuthenticated && <Link href="/login">
            <a>Login</a>
          </Link>}
          {!isAuthenticated && <Link href="/register">
            <a>Register</a>
          </Link>}
          {isAuthenticated && <Link href="/logout">
            <a>Logout</a>
          </Link>}
        </nav>
      </header>
      {children}
      <footer>
        <hr />
        <span>I'm here to stay (Footer)</span>
      </footer>
    </div>
  );
}

export default Layout
