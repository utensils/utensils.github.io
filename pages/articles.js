import Container from '../components/container'
import MoreStories from '../components/more-stories'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import PostPreview from '../components/post-preview'

export default function Index({ allPosts }) {
  return (
    <>
      <Layout>
        <Head>
          <title>Utensils</title>
        </Head>
        <Container>
        <section className="flex-row flex items-left mt-20">
          <div className="flex-col flex items-left w-3/4">
            <h1 className="text-8xl font-extra-bold tracking-tighter leading-tight md:pr-8">
            Utensils
            </h1>
            <span className="text-4xl text-gray-400">words and wisdom</span>
            {allPosts.map((post) => {
              return <PostPreview authors={post.authors} title={post.title} excerpt={post.excerpt} tags={post.tags}/>
            })}
          </div>
          <div className="flex-col flex items-right text-right w-1/4 pt-10">
            <a href="/" className="text-3xl hover:underline hover:font-bold">Home</a>
            <a href="/articles" className="text-3xl hover:underline hover:font-bold">Articles</a>
            <a href="https://github.com/utensils" target="_blank" className="text-3xl hover:underline hover:font-bold">Projects</a>
          </div>
        </section>
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'authors',
    'excerpt',
    'tags'
  ])

  return {
    props: { allPosts },
  }
}
