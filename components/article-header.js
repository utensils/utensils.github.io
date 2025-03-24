import Avatar from './avatar'
import DateFormatter from './date-formatter'
import ArticleTitle from './article-title'

export default function ArticleHeader({ title, date, authors = [] }) {
  return (
    <>
      <div className="max-w-2xl mx-right pl-6 pt-6">
        <div className="text-lg font-bold">
          <DateFormatter dateString={date} />
        </div>
        {authors && authors.length > 0 && (
          <div className="flex flex-inline pb-2 pt-4">
            {authors.map((author) => (
              <Avatar 
                key={author.name || 'anonymous'} 
                name={author.name} 
                github={author.github} 
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}