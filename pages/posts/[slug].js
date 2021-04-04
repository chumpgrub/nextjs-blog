import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Layout from '../../components/layout'
import Date from '../../components/date'

import { getAllPostsWithSlug, getPost } from '../../lib/api'

import utilStyles from '../../styles/utils.module.css'

const Post = ({ postData }) => {
    const router = useRouter()
    if (!router.isFallback && !postData?.slug) {
        return <p>Hmm... looks like an error.</p>
    }
    return (
        <Layout>
            <Head>
                <title>{postData?.title}</title>
            </Head>
            {router.isFallback ? (
                <h2>Loading...</h2>
            ) : (
                <article>
                    <h1 className={utilStyles.headingXl}>{postData?.title}</h1>
                    <div className={utilStyles.lightText}>
                        <Date dateString={postData?.date} />
                     </div>
                    <div dangerouslySetInnerHTML={{__html: postData?.content}} />
                </article>
            )}
            <p>
                <Link href='/posts'>
                    <a>Back to articles</a>
                </Link>
            </p>
        </Layout>
    )
}

export default Post

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug()
  return {
        paths: allPosts.edges.map(({ node }) => `/posts/${node.slug}`) || [],
        fallback: true
  }
}

export async function getStaticProps({ params }) {
  const data = await getPost(params.slug)
  return {
    props: {
        postData: data.post
    }
  }
}