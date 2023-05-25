import Layout from "@/components/shared/Layout";
import "@/styles/globals.css";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }) {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <Layout isLoading={isLoading}>
      <Component {...pageProps} />
    </Layout>
  );
}
