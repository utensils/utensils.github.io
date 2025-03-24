import { ar } from 'date-fns/locale'
import ArticlePreview from './article-preview'

export default function ArticleList({ articles = [] }) {
  if (!articles || articles.length === 0) {
    return (
      <section>
        <div className="flex flex-col mt-6">
          <p>No articles found.</p>
        </div>
      </section>
    )
  }

  return (
    <section>
      <div className="flex flex-col mt-6">
        {articles.map((article) => (
          <ArticlePreview
            key={article.slug}
            title={article.title}
            excerpt={article.excerpt}
            date={article.date}
            authors={article.authors}
            slug={article.slug}
            tags={article.tags}
          />
        ))}
      </div>
    </section>
  )
}
