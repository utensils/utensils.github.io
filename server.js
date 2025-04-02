const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const chokidar = require('chokidar');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
    
    // Watch the _pages directory for changes
    if (dev) {
      const watcher = chokidar.watch(path.join(__dirname, '_pages'), {
        ignored: /(^|[\/\\])\../, // ignore dotfiles
        persistent: true
      });
      
      watcher.on('change', (filePath) => {
        console.log(`> File changed: ${filePath}`);
        // This will trigger a page reload when content changes
        app.server.hotReloader.send('reloadPage');
      });
      
      console.log('> Watching _pages directory for changes');
    }
  });
});
