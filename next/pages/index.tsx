import { GetStaticProps } from "next";
import {
  getEntriesWithVerification,
  VerifiedEntriesOutcome,
} from "../utils/data";
import App from "../components/App";

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
        <App user={d.verified} entries={d.data}/>
    );
}