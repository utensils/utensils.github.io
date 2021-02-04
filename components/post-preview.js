export default function PostPreview({
  title,
  excerpt,
  tags,
}) {
  return (
    <div className="p-6 flex flex-col items-start">
      <div className="inline-flex">
      {tags.map((tag) => (
        <span className="py-1 px-2 mr-2 rounded bg-red-50 text-red-500 text-xs font-medium tracking-widest">{tag}</span>
      ))}
      </div>
      <h2 className="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4">{title}</h2>
      <p className="leading-relaxed mb-4">{excerpt}</p>
      <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-100 mt-auto w-full">
        <a className="text-red-500 inline-flex items-center">Learn More
          <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </div>
  )
}
