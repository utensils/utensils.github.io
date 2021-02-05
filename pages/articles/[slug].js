import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import ArticleBody from '../../components/article-body'
import Header from '../../components/header'
import ArticleHeader from '../../components/article-header'
import Layout from '../../components/layout'
import { getArticleBySlug, getAllArticles } from '../../lib/api'
import ArticleTitle from '../../components/article-title'
import Head from 'next/head'
import markdownToHtml from '../../lib/markdownToHtml'

export default function Article({ article, preview }) {
  const router = useRouter()
  if (!router.isFallback && !article?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <Container>
        <Header subtitle={article.title} />
        {router.isFallback ? (
          <ArticleTitle>Loading…</ArticleTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {article.title} | Utensils.io 
                </title>
              </Head>
              <ArticleHeader
                title={article.title}
                date={article.date}
                authors={article.authors}
              />
              <ArticleBody content={article.content} excerpt={article.excerpt} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const article = getArticleBySlug(params.slug, [
    'authors',
    'content',
    'date',
    'excerpt',
    'slug',
    'title',
  ])
  const content = await markdownToHtml(article.content || '')

  return {
    props: {
      article: {
        ...article,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const articles = getAllArticles(['slug'])

  return {
    paths: articles.map((article) => {
      return {
        params: {
          slug: article.slug,
        },
      }
    }),
    fallback: false,
  }
}
