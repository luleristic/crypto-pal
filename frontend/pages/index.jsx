import UseAuth from "../helpers/UseAuth";

import Head from "next/head";
import Dashboard from "../components/Dashboard";
import Layout from "../components/ui/Layout";

export default function Home() {

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UseAuth></UseAuth>
      <Layout>
        <Dashboard></Dashboard>
      </Layout>
    </>
  );
}
