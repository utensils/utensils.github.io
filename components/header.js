import Link from 'next/link'

export default function Header({ subtitle }) {
  return (
  <section className="flex-col flex items-left mt-20">
    <div className="flex-row flex items-left text-left">
      <Link href="/">
      <a class="flex title-font font-medium items-center md:justify-start justify-center mr-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-red-500 hover:bg-red-600 rounded-full" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </a>
      </Link>
      <a href="/articles" className="text-3xl text-red-500 hover:text-red-600 font-black hover:underline mr-4">Articles</a>
      <a href="https://github.com/utensils" target="_blank" className="text-3xl text-red-500 hover:text-red-600 font-black hover:underline">GitHub</a>
    </div>
    <div className="flex-col flex items-left mt-10">
      <h1 className="text-8xl font-black tracking-tighter leading-tight md:pr-8">
      Utensils
      </h1>
      <span className="text-4xl text-gray-400">{subtitle}</span>
    </div>
  </section>
  )
}
