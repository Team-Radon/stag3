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
            href=""
            type="image/x-icon"
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
