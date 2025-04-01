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
import Meta from '../../components/meta'
import markdownToHtml from '../../lib/markdownToHtml'

export default function Article({ article, preview }) {
  const router = useRouter()
  if (!router.isFallback && !article?.slug) {
    return <ErrorPage statusCode={404} />
  }
  
  // Check if article has a featured image
  const hasImage = article.slug === 'dangerous-ai-how-i-use-llms-to-make-infrastructure-work-suck-less' || 
                  article.slug === '10-things-i-hate-about-nixos' || 
                  article.slug === 'copy-pasta-the-adhd-engineers-guide-to-massive-context-windows';
  
  // Construct image path based on article slug
  const imagePath = hasImage ? 
    `/images/articles/${article.slug}/social-share.jpg` : 
    '/logo.png';
    
  // Get the host for absolute URLs
  const host = process.env.NODE_ENV === 'production' ? 'https://utensils.io' : 'http://localhost:3000';
  const absoluteImagePath = `${host}${imagePath}`;
  
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
                <title>{`${article.title} | Utensils.io`}</title>
                {/* Open Graph Meta Tags */}
                <meta property="og:title" content={`${article.title} | Utensils.io`} />
                <meta property="og:description" content={article.excerpt || 'Home of the premier product studio'} />
                <meta property="og:image" content={absoluteImagePath} />
                <meta property="og:url" content={`${host}/articles/${article.slug}`} />
                <meta property="og:type" content="article" />
                <meta property="og:site_name" content="Utensils.io" />
                
                {/* Twitter Card Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${article.title} | Utensils.io`} />
                <meta name="twitter:description" content={article.excerpt || 'Home of the premier product studio'} />
                <meta name="twitter:image" content={absoluteImagePath} />
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
