import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import Layout from '../../components/layout'

import { getAllPosts } from '../../lib/api'

// Styles here

const BlogListing = ({ allPosts: {edges} }) => (
    <Layout>
        <Head>
            <title>Blog Listing Page</title>
        </Head>
        <main>
            <h1>Latest Blog Articles</h1>
            <hr />
            <section>
                {edges.map(({ node }) => (
                    <div key={node.id}>
                        <div>
                            <figure>
                                <Image
                                    src={node.extraPostInfo.thumbImage.mediaItemUrl}
                                    height={300}
                                    width={300}
                                    alt={node.title}
                                />
                            </figure>
                        </div>
                        <div>
                            <h3>{node.title}</h3>
                            <p>{node.excerpt}</p>
                            <Link href={`/posts/${node.slug}`}>
                                <a>Read more ></a>
                            </Link>
                        </div>
                    </div>
                ))}
            </section>
        </main>
    </Layout>
)

export default BlogListing

export async function getStaticProps() {
    const allPosts = await getAllPosts()
    return {
        props: {
            allPosts
        }
    }
}
