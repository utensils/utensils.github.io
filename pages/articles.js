import Container from '../components/container'
import ArticleList from '../components/article-list'
import Header from '../components/header'
import Layout from '../components/layout'
import { getAllArticles } from '../lib/api'
import Head from 'next/head'

export default function Index({ allArticles }) {
  return (
    <>
      <Layout>
        <Head>
          <title>Utensils</title>
        </Head>
        <Container>
        <Header subtitle="words and wisdom" />
        <ArticleList articles={allArticles}/>
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allArticles = getAllArticles([
    'title',
    'date',
    'slug',
    'authors',
    'excerpt',
    'tags'
  ])

  return {
    props: { allArticles },
  }
}
