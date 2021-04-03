import Head from 'next/head'
import Link from 'next/link'

import Layout from '../../components/layout'

const FirstPost = () => (
    <Layout>
        <Head>
            <title>First Poster Title</title>
        </Head>
        <h1>First Poster</h1>
        <Link href="/">
            link to homepage
        </Link>
    </Layout>
)

export default FirstPost
