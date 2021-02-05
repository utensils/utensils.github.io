import DateFormatter from '../components/date-formatter'
import Tags from '../components/tags'
import Link from 'next/link'

export default function ArticlePreview({
  date,
  excerpt,
  slug,
  tags,
  title,
}) {
  return (
    <div className="px-6 flex flex-col items-start">
      <Link as={`/articles/${slug}`} href="/articles/[slug]">
        <a className="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4">{title}</a>
      </Link>
      <div className="inline-flex">
        <div className="text-lg font-bold text-gray-400 mr-6">
          <DateFormatter dateString={date} />
        </div>
        <div>
        <Tags key={slug} tags={tags} />
        </div>
      </div>
      <p className="leading-relaxed mt-4 mb-4">{excerpt}</p>
      <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-100 mt-auto w-full">
      <Link as={`/articles/${slug}`} href="/articles/[slug]">
        <a className="text-red-500 font-bold hover:underline hover:text-red-600 inline-flex items-center">Learn More
          <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </Link>
      </div>
    </div>
  )
}
