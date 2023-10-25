import React from "react";
import Layout from "@theme/Layout";
import HomepageContent from "../components/HomepageContent";
import HomepageHeader from "../components/HomepageHeader";

export default function Home(): JSX.Element {
  return (
    <Layout title={"magic-fox"}>
      <HomepageHeader />
      <main>
        <HomepageContent />
      </main>
    </Layout>
  );
}
