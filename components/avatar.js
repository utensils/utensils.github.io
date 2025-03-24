export default function Avatar({ name = 'Anonymous', github }) {
  if (!name) return null

  return (
    <div className="flex items-center">
      <div className="text-2xl font-bold text-red-500 hover:text-red-600 pr-2">
        {github ? (
          <a href={github} target="_blank" rel="noopener noreferrer">{name}</a>
        ) : (
          <span>{name}</span>
        )}
      </div>
    </div>
  )
}
