import markdownStyles from './markdown-styles.module.css'

export default function ArticleBody({ content, excerpt }) {
  return (
    <div className="max-w-2xl mx-right pl-6 prose">
      <span className="text-gray-400 text-bold text-xl">{excerpt}</span>
      <div
        className={markdownStyles['markdown']}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}
