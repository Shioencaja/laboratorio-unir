import Head from "next/head";

export default function Header(props) {
  <Head>
    <title>Proyectos</title>
    <meta name="description" content={props.description} />
    <meta name="keywords" content={props.keywords} />
    <meta name="author" content={props.author} />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="/favicon.ico" />
  </Head>;
}
