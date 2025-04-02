export default function PageHeader({ excerpt }) {
  return (
    <div className="max-w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl ml-0 mr-auto pl-3 md:pl-6 pt-6">
      {excerpt && (
        <div className="text-base sm:text-lg text-gray-500 mb-6">
          {excerpt}
        </div>
      )}
    </div>
  )
}
