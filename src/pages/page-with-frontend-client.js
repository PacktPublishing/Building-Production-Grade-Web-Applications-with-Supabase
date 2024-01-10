import { getSupabaseBrowserClient } from "@/supabase-utils/browserClient";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const supabase = getSupabaseBrowserClient();
  const [buckets, setBuckets] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then((result) => {
      console.log("Session", result);
    });

    supabase.storage.listBuckets().then((result) => {
      console.log("Bucket List", result);
      setBuckets(result);
    });
  }, [supabase]);

  return (
    <>
      <Head>
        <title>Frontend Client / Pages Router</title>
      </Head>
      <main>
        <div>
          <h1>
            Page with Frontend Client usage via <code>useEffect</code> and{" "}
            <code>useSupabaseClient</code>
          </h1>

          {buckets === null && <strong>Loading...</strong>}

          {buckets !== null && (
            <>
              <h2>Result:</h2>
              <pre>{JSON.stringify(buckets, null, 2)}</pre>
            </>
          )}
        </div>
      </main>
    </>
  );
}
