export default function Avatar({ name, github }) {
  return (
    <div className="flex items-center">
      <div className="text-2xl font-bold text-red-500 hover:text-red-600 pr-2">
        <a href={github}>{name}</a>
      </div>
    </div>
  )
}
