/* eslint-disable @next/next/no-sync-scripts */
import NavBar from 'components/NavBar';
import { Html, Head, Main, NextScript } from 'next/document'

export default Document;

function Document() {
    return (
        <Html lang="en" className='style-scrollbar'>
            <Head>
                {/* eslint-disable-next-line @next/next/no-css-tags */}
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossOrigin="anonymous"/>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossOrigin="anonymous"></script>
            </Head>


            <body>
                <NavBar />
                <Main />
                <NextScript />
                {/* footer */}
                <footer className="bg-dark p-4 text-white size-footer">
                    <div className="container d-flex justify-content-between">
                        <span>
                        © Copyright {new Date().getFullYear()} Space Shield.
                        </span>
                        <div className="flex text-2xl">
                        <a href='#'>.</a>
                        </div>
                    </div>
                </footer> 
            </body>

        </Html>
    );
}
