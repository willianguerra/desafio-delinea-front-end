import Document, { Html, Head, Main, NextScript } from "next/document";
export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;700;800&family=Roboto:wght@400;500;700&display=swap"  rel="stylesheet" />

          <link rel="icon" type="image/svg+xml" href="https://www.delinea.com.br/wp-content/uploads/2021/12/favicon-delinea.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}