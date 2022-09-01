import express from 'express';
import { createServer } from 'http';
import next from 'next';


const port = parseInt(process.env.PORT || '3000', 10);

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(async () => {
  const app = express();

  app.disable('x-powered-by');

  app.set('trust proxy', 1);


  app.all('*', (req, res) => {
    if (!dev) {
      if (req.method === 'POST' && req.url !== '/api/assets-download') {
        if (req.url.includes('__cf_chl')) {
          res.redirect(req.url);
        } else {
          res.end();
        }
      } else {
        handle(req, res);
      }
    } else {
      handle(req, res);
    }
  });

  const server = createServer(app).listen(port);

  // timeout on disconnecting requests
  server.setTimeout(10 * 1000);

  console.info(
    `> Server listening at http://localhost:${port} as ${
      dev ? 'development' : process.env.NODE_ENV
    }`
  );
});
