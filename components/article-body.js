import markdownStyles from './markdown-styles.module.css'

export default function ArticleBody({ content }) {
  return (
    <div className="max-w-2xl mx-right pl-6 prose">
      <div
        className={markdownStyles['markdown']}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}
