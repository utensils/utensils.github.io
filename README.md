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
- `preview-test` - Start the development server and create a localtunnel for testing link previews

## Available Scripts

- `yarn dev` - Starts the development server
- `yarn build` - Builds the application for production
- `yarn start` - Serves the static output directory using the 'serve' package
- `yarn export` - Alias for `yarn build` (builds the static site)
- `yarn lint` - Runs ESLint to check code quality
- `yarn lint:fix` - Runs ESLint with auto-fix to fix code style issues

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

### Social Media Sharing

Articles include Open Graph and Twitter Card metadata for better link previews when shared on social media platforms. To enable rich previews for an article:

1. Create a social sharing image with these recommended specifications:
   - **Size**: 1200x630 pixels (optimal for most platforms)
   - **Aspect ratio**: 1.91:1 (Facebook/Twitter/LinkedIn standard)
   - **Alternative ratios**:
     - 2:1 (Twitter large card)
     - 1:1 (Square for Instagram and some mobile displays)
   - **File format**: JPG or PNG (JPG preferred for photos, PNG for graphics with text)
   - **File size**: Keep under 1MB for faster loading
2. Save it as `social-share.jpg` in the article's image directory: `/public/images/articles/[article-slug]/social-share.jpg`

The metadata implementation automatically detects if an article has a social sharing image and uses it for the preview. If no image is found, it falls back to the site logo.

> **Best Practices**: Place important content in the center of the image, as some platforms may crop the edges. Text should be minimal and large enough to be readable when the image is displayed at smaller sizes.

### Testing Link Previews

To test how your articles will appear when shared on social media:

1. Run the `preview-test` command in the Nix development environment:
   ```shell
   nix develop
   preview-test
   ```
2. This will start the development server and create a public URL using localtunnel
3. Use the generated URL with social media preview testing tools:
   - [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
   - [Twitter Card Validator](https://cards-dev.twitter.com/validator)
   - [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
   - [OpenGraph.xyz](https://www.opengraph.xyz/)

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch. The deployment process is handled by a GitHub Actions workflow defined in `.github/workflows/deploy.yml`.

The workflow:
1. Checks out the code
2. Sets up Node.js
3. Installs dependencies with Yarn
4. Builds and exports the static site
5. Copies the CNAME file to the output directory
6. Deploys to GitHub Pages

## Code Quality

The project includes ESLint and Prettier for code quality and formatting:

- ESLint is configured with relaxed rules that warn rather than error
- Prettier is set up with common formatting preferences
- Linting is optional and not enforced in CI/CD

To check code quality:
```bash
# In the Nix development environment
lint

# Or using Yarn directly
yarn lint
```

To automatically fix code style issues:
```bash
# In the Nix development environment
lint-fix

# Or using Yarn directly
yarn lint:fix
```

## Technologies

- [Next.js](https://nextjs.org/) - React framework
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Remark](https://github.com/remarkjs/remark) - Markdown processor
- [ESLint](https://eslint.org/) - JavaScript linter
- [Prettier](https://prettier.io/) - Code formatter
