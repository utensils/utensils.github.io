import { CMS_NAME } from '../lib/constants'

export default function Intro() {
  return (
    <section className="flex-row flex items-left mt-20">
      <div className="flex-col flex items-left w-3/4">
        <h1 className="text-8xl font-extra-bold tracking-tighter leading-tight md:pr-8">
        Utensils
        </h1>
        <span className="text-4xl text-gray-400">yo͞oˈtensəls</span>
        <span className="text-2xl text-gray-600 pl-6 pt-6">
          1. an implement, container, or other article, especially for household use.
        </span>
        <span className="text-2xl text-gray-800 pl-6">
          2. a product or experienced individual that delivers results, especially for engineer and systems work.
        </span>
      </div>
      <div className="flex-col flex items-right text-right w-1/4 pt-10">
        <a href="/" className="text-3xl hover:underline hover:font-bold">Home</a>
        <a href="/articles" className="text-3xl hover:underline hover:font-bold">Articles</a>
        <a href="https://github.com/utensils" target="_blank" className="text-3xl hover:underline hover:font-bold">Projects</a>
      </div>
    </section>
  )
}
