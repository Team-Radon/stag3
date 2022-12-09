import Document, {
  Html, Head, Main, NextScript, DocumentContext
} from 'next/document';

class Stag3Document extends Document {
  static async getInitialProps (ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render () {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="shortcut icon"
            href="https://cdn2.whatoplay.com/stag3/favicon.ico"
            type="image/x-icon"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Stag3Document;
