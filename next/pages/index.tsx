import { GetStaticProps } from "next";
import {
  getEntriesWithVerification,
  VerifiedEntriesOutcome,
} from "../utils/data";
import App from "../components/App";
import Head from "next/head";

export const getStaticProps: GetStaticProps = async () => {
    const data = getEntriesWithVerification();
    return {
        props: {
            data
        }
    }
}

export default function Home ({data}) {
    const d: VerifiedEntriesOutcome = data;
    return (
        <>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta
            name="description"
            content="Eana’s user page. A simple and rough about-me page heavily inspired by Wikipedia Userboxes."
            />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="og:title" content="User:Eana Hufwe." />
            <meta name="og:image" content="https://labs.1a23.com/userpage/images/banner.png" />
            <meta name="og:description" content="Eana’s user page. A simple and rough about-me page heavily inspired by Wikipedia Userboxes." />
            <link rel="apple-touch-icon" sizes="180x180" href="./apple-touch-icon.png?v=GvbwNX7r4M" />
            <link rel="icon" type="image/png" sizes="32x32" href="./favicon-32x32.png?v=GvbwNX7r4M" />
            <link rel="icon" type="image/png" sizes="16x16" href="./favicon-16x16.png?v=GvbwNX7r4M" />
            <link rel="mask-icon" href="./safari-pinned-tab.svg?v=GvbwNX7r4M" color="#303030" />
            <link rel="shortcut icon" href="./favicon.ico?v=GvbwNX7r4M" />
            <meta name="msapplication-TileColor" content="#303030" />
            <meta name="theme-color" content="#303030" />
            <link rel="manifest" href="./site.webmanifest?v=GvbwNX7r4M" />
        </Head>
        <App user={d.verified} entries={d.data}/>
        </>
    );
}