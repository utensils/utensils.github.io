import Header from '../components/header'

export default function Intro() {
  return (
    <div className="flex flex-col">
      <Header subtitle="yo͞oˈtensəls" />
      <div className="flex-col flex items-left">
        <span className="text-2xl text-gray-600 pl-6 pt-6">
          1. an implement, container, or other article, especially for household use.
        </span>
        <span className="text-2xl font-bold text-gray-600 pl-6">
          2. a product or experienced individual that delivers results, especially for engineering and systems work.
        </span>
      </div>
    </div>
  )
}
