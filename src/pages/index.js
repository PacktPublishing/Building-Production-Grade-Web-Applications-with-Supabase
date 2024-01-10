import { getSupabaseBrowserClient } from "@/supabase-utils/browserClient";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const supabase = getSupabaseBrowserClient();
  useEffect(() => {
    supabase.storage.listBuckets().then((result) => {
      console.log("Bucket List", result);
    });
  }, [supabase]);

  return (
    <>
      <Head>
        <title>Supabase Pages Router</title>
      </Head>

      <ul>
        <li>
          <Link className="highlight" href="/page-with-server-client">
            Page with <strong>Server Client</strong> usage in{" "}
            <code>getServerSideProps</code>
          </Link>
        </li>
        <li>
          <Link className="highlight" href="/page-with-frontend-client">
            Page with <strong>Frontend Client</strong> usage in{" "}
            <code>getServerSideProps</code>
          </Link>
        </li>
      </ul>
    </>
  );
}
