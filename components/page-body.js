import markdownStyles from './markdown-styles.module.css'
import { useEffect, useRef } from 'react'

export default function PageBody({ content }) {
  const contentRef = useRef(null)
  
  useEffect(() => {
    if (contentRef.current) {
      // Find all tables in the content
      const tables = contentRef.current.querySelectorAll('table')
      
      // Wrap each table in a responsive wrapper div
      tables.forEach(table => {
        if (table.parentNode.className !== 'table-wrapper') {
          const wrapper = document.createElement('div')
          wrapper.className = 'table-wrapper'
          table.parentNode.insertBefore(wrapper, table)
          wrapper.appendChild(table)
        }
      })
    }
  }, [content])
  
  return (
    <div className="max-w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl ml-0 mr-auto pl-3 md:pl-6 overflow-x-hidden">
      <div
        ref={contentRef}
        className={`${markdownStyles['markdown']} text-base sm:text-lg`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}
