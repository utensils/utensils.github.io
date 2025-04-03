import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../components/container'
import PageBody from '../components/page-body'
import PageHeader from '../components/page-header'
import Header from '../components/header'
import Layout from '../components/layout'
import { getPageBySlug, getAllPages } from '../lib/api'
import Head from 'next/head'
import markdownToHtml from '../lib/markdownToHtml'
import Meta from '../components/meta'

export default function Page({ page, preview }) {
  const router = useRouter()
  
  if (router.isFallback) {
    return (
      <Layout preview={preview}>
        <Container>
          <div className="text-2xl font-bold">Loading…</div>
        </Container>
      </Layout>
    )
  }
  
  if (!page?.slug) {
    return <ErrorPage statusCode={404} />
  }
  
  // Get the host for absolute URLs
  const host = 'https://utensils.io'
  
  // For social sharing, we need absolute URLs to images
  // This ensures images work both locally and in production
  
  const absoluteImagePath = `${host}${page.ogImage || '/logo.png'}`
  
  // Check if this is the MCP-NixOS page to use custom favicon
  const isMcpNixosPage = page.slug === 'mcp-nixos'
  
  // For the MCP-NixOS page, we'll render without the default Layout
  // to avoid loading the default Meta component with its favicon links
  if (isMcpNixosPage) {
    return (
      <div className="min-h-screen">
        <Head>
          <title>{`${page.title} | Utensils`}</title>
          <meta property="og:title" content={`${page.title} | Utensils.io`} />
          <meta property="og:description" content={page.description || page.excerpt || 'Utensils.io'} />
          <meta property="og:image" content={absoluteImagePath} />
          <meta property="og:url" content={`${host}/${page.slug}`} />
          <meta property="og:type" content="article" />
          <meta property="og:site_name" content="Utensils.io" />
          
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={`${page.title} | Utensils.io`} />
          <meta name="twitter:description" content={page.description || page.excerpt || 'Utensils.io'} />
          <meta name="twitter:image" content={absoluteImagePath} />
          
          {/* Custom favicon links for MCP-NixOS page */}
          <link rel="apple-touch-icon" sizes="180x180" href="/images/pages/mcp-nixos/favicon/apple-touch-icon.png" />
          <link rel="apple-touch-icon-precomposed" href="/images/pages/mcp-nixos/favicon/apple-touch-icon-precomposed.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/images/pages/mcp-nixos/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/images/pages/mcp-nixos/favicon/favicon-16x16.png" />
          <link rel="shortcut icon" href="/images/pages/mcp-nixos/favicon/favicon.ico" />
          <meta name="msapplication-TileColor" content="#000000" />
          <meta name="theme-color" content="#000" />
          <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
          <meta name="description" content={page.description || page.excerpt || 'MCP-NixOS - Because Your AI Assistant Shouldn\'t Hallucinate About Packages'} />
        </Head>
        <main>
          <Container>
            <Header subtitle={page.title} />
            <article>
              <PageHeader excerpt={page.excerpt} />
              <PageBody content={page.content} />
            </article>
          </Container>
        </main>
      </div>
    )
  }
  
  // For all other pages, use the normal Layout with Meta component
  return (
    <Layout preview={preview}>
      <Container>
        <Header subtitle={page.title} />
        <article>
          <Head>
            <title>{`${page.title} | Utensils`}</title>
            <meta property="og:title" content={`${page.title} | Utensils.io`} />
            <meta property="og:description" content={page.description || page.excerpt || 'Utensils.io'} />
            <meta property="og:image" content={absoluteImagePath} />
            <meta property="og:url" content={`${host}/${page.slug}`} />
            <meta property="og:type" content="article" />
            <meta property="og:site_name" content="Utensils.io" />
            
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={`${page.title} | Utensils.io`} />
            <meta name="twitter:description" content={page.description || page.excerpt || 'Utensils.io'} />
            <meta name="twitter:image" content={absoluteImagePath} />
          </Head>
          <PageHeader
            excerpt={page.excerpt}
          />
          <PageBody content={page.content} />
        </article>
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  try {
    const page = getPageBySlug(params.page, [
      'title',
      'description',
      'excerpt',
      'content',
      'slug',
      'ogImage',
    ])
    const content = await markdownToHtml(page.content || '')

    return {
      props: {
        page: {
          ...page,
          content,
        },
      },
    }
  } catch (error) {
    // Log error but don't expose in production
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error(`Error getting page ${params.page}:`, error)
    }
    return {
      notFound: true,
    }
  }
}

export async function getStaticPaths() {
  const pages = getAllPages(['slug'])

  return {
    paths: pages.map((page) => {
      return {
        params: {
          page: page.slug,
        },
      }
    }),
    fallback: false,
  }
}
