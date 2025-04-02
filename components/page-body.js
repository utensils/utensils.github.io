import markdownStyles from './markdown-styles.module.css'

export default function PageBody({ content }) {
  return (
    <div className="max-w-5xl ml-6 prose lg:prose-lg">
      <div
        className={markdownStyles['markdown']}
        style={{ width: '100%' }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}
