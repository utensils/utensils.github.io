import Link from 'next/link'

export default function Header({ subtitle }) {
  return (
  <section className="flex-col flex items-left mt-20">
    <div className="flex-row flex items-left text-left">
      <Link href="/">
        <a className="flex title-font font-medium items-center md:justify-start justify-center mr-4">
          <img src="/logo.png" className="w-12 h-12 mb-2" />
        </a>
      </Link>
      <a href="/articles" className="pt-1 text-3xl text-red-500 hover:text-red-600 font-black hover:underline mr-4">Articles</a>
      <a href="https://github.com/utensils" target="_blank" className="pt-1 text-3xl text-red-500 hover:text-red-600 font-black hover:underline">GitHub</a>
    </div>
    <div className="flex-col flex items-left mt-10">
      <h1 className="text-8xl font-black tracking-tighter leading-tight md:pr-8">
      Utensils
      </h1>
      <span className="lowercase text-4xl text-gray-400">{subtitle}</span>
    </div>
  </section>
  )
}
