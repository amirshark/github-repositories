import Head from 'next/head';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
    return (<>
        <Head>
            <link rel="icon" href="/favicon.ico" />
            <link rel="stylesheet" href="/css/material-icons.min.css" />
            <link rel="stylesheet" href="/css/bootstrap.min.css" />
        </Head>
        <Component {...pageProps} />
    </>
    )
}

export default MyApp
