export default function PageHeader({ excerpt }) {
  return (
    <div className="max-w-5xl ml-6 pt-6">
      {excerpt && (
        <div className="text-lg text-gray-500 mb-6">
          {excerpt}
        </div>
      )}
    </div>
  )
}
