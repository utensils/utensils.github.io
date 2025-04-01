# Utensils.io

The home of [Utensils.io](https://utensils.io).

## Project Overview

This is a [Next.js](https://nextjs.org/) project that generates a static website for Utensils.io. The site uses TailwindCSS for styling to create a modern, responsive design.

## Development Requirements

- Node.js version 22
- Yarn package manager (version 1.22.22+ recommended)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```shell
   yarn install --frozen-lockfile
   ```
3. Start the development server:
   ```shell
   yarn dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result

### Nix Development Environment (Optional)

If you have [Nix](https://nixos.org/) installed with flakes enabled, you can use the provided development environment:

```shell
nix develop
```

This will set up a shell with all the required dependencies and provide convenient commands:
- `dev` - Start the development server
- `build` - Build the site for production
- `start` - Start the production server
- `install-deps` - Install dependencies

## Available Scripts

- `yarn dev` - Starts the development server
- `yarn build` - Builds the application for production
- `yarn start` - Serves the static output directory using the 'serve' package
- `yarn export` - Alias for `yarn build` (builds the static site)

## Project Structure

- `_articles/` - Markdown files for blog articles
- `components/` - React components
- `lib/` - Utility functions and constants
- `pages/` - Next.js pages
- `public/` - Static assets
- `styles/` - CSS styles

## Adding Content

Articles are written in Markdown format and stored in the `_articles/` directory. Each article should include frontmatter with the following fields:

```markdown
---
title: 'Article Title'
excerpt: 'Brief description of the article'
date: 'YYYY-MM-DD'
slug: 'article-slug'
authors:
  - name: Author Name
    github: https://github.com/username
tags:
  - 'Tag1'
  - 'Tag2'
---

Article content goes here...
```

### Adding Images to Articles

Images for articles should be placed in the `/public/images/articles/[article-slug]/` directory. For example, images for an article with the slug `my-new-article` would go in `/public/images/articles/my-new-article/`.

Reference images in your Markdown using standard syntax:

```markdown
![Image description](/images/articles/my-new-article/image-name.jpg)
```

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch. The deployment process is handled by a GitHub Actions workflow defined in `.github/workflows/deploy.yml`.

The workflow:
1. Checks out the code
2. Sets up Node.js
3. Installs dependencies with Yarn
4. Builds and exports the static site
5. Copies the CNAME file to the output directory
6. Deploys to GitHub Pages

## Technologies

- [Next.js](https://nextjs.org/) - React framework
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Remark](https://github.com/remarkjs/remark) - Markdown processor
