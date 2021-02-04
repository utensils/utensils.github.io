export default function Tags({ tags }) {
  return (
    <div className="inline-flex">
    {tags.map((tag) => (
      <span className={`py-1 px-2 mr-2 rounded bg-red-50 text-red-500 text-xs font-black tracking-widest`}>{tag}</span>
    ))}
    </div>
  )
}
