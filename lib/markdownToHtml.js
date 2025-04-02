import remark from 'remark'
import html from 'remark-html'
import gfm from 'remark-gfm'
import { visit } from 'unist-util-visit'
import prism from 'prismjs'

// Load Prism languages
require('prismjs/components/prism-bash')
require('prismjs/components/prism-javascript')
require('prismjs/components/prism-typescript')
require('prismjs/components/prism-css')
require('prismjs/components/prism-jsx')
require('prismjs/components/prism-json')
require('prismjs/components/prism-markdown')
require('prismjs/components/prism-python')
require('prismjs/components/prism-ruby')
require('prismjs/components/prism-go')
require('prismjs/components/prism-rust')
require('prismjs/components/prism-yaml')
require('prismjs/components/prism-nix')

// Custom plugin to add syntax highlighting
function syntaxHighlight() {
  return (tree) => {
    visit(tree, 'code', (node) => {
      const lang = node.lang || '';
      if (lang && prism.languages[lang]) {
        node.type = 'html';
        const highlighted = prism.highlight(
          node.value,
          prism.languages[lang],
          lang
        );
        node.value = `<pre class="language-${lang}"><code class="language-${lang}">${highlighted}</code></pre>`;
      }
    });
  };
}

export default async function markdownToHtml(markdown) {
  const result = await remark()
    .use(gfm)
    .use(syntaxHighlight)
    .use(html, { sanitize: false })
    .process(markdown);
  
  return result.toString();
}
