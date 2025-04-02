import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { parseISO } from 'date-fns'

const articlesDirectory = join(process.cwd(), '_articles')
const pagesDirectory = join(process.cwd(), '_pages')

// Article functions
export function getArticleSlugs() {
  return fs.readdirSync(articlesDirectory)
}

export function getArticleBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(articlesDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllArticles(fields = []) {
  const slugs = getArticleSlugs()
  const articles = slugs
    .map((slug) => getArticleBySlug(slug, fields))
    // sort articles by date in descending order
    .sort((article1, article2) => {
      const date1 = parseISO(article1.date)
      const date2 = parseISO(article2.date)
      return date2 - date1
    })
  return articles
}

// Page functions
export function getPageSlugs() {
  // Create directory if it doesn't exist yet
  if (!fs.existsSync(pagesDirectory)) {
    fs.mkdirSync(pagesDirectory, { recursive: true })
    return []
  }
  return fs.readdirSync(pagesDirectory)
}

export function getPageBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(pagesDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllPages(fields = []) {
  const slugs = getPageSlugs()
  const pages = slugs
    .map((slug) => getPageBySlug(slug, fields))
    // Sort pages by order if available, otherwise by title
    .sort((page1, page2) => {
      if (page1.order && page2.order) {
        return page1.order - page2.order
      }
      if (page1.title && page2.title) {
        return page1.title.localeCompare(page2.title)
      }
      return 0
    })
  return pages
}
