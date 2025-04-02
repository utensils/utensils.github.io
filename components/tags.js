export default function Tags({ tags = [] }) {
  if (!tags || tags.length === 0) return null

  return (
    <div className="flex flex-wrap items-center">
      {tags.map((tag) => (
        <span key={tag} className={`py-1 px-2 mr-2 mb-2 rounded bg-red-50 text-red-500 text-xs font-black tracking-widest`}>{tag}</span>
      ))}
    </div>
  )
}
