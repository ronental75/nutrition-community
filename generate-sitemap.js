const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://nutrition-community.vercel.app';

// Set folders to scan for routes
const scanFolders = [
  { dir: 'public/posts', prefix: '/posts' },
  { dir: 'public/src', prefix: '/src' },
];

// Helper to get file names without extension
const getRoutesFromFolder = (folderPath, prefix) => {
  if (!fs.existsSync(folderPath)) return [];

  return fs
    .readdirSync(folderPath)
    .filter((file) => file.endsWith('.html'))
    .map((file) => {
      const name = file.replace('.html', '');
      return `${prefix}/${name}`;
    });
};

// Base routes
const staticRoutes = ['/', '/about', '/contact'];

let dynamicRoutes = [];

scanFolders.forEach(({ dir, prefix }) => {
  const absolutePath = path.join(__dirname, dir);
  dynamicRoutes = dynamicRoutes.concat(getRoutesFromFolder(absolutePath, prefix));
});

const allRoutes = [...staticRoutes, ...dynamicRoutes];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `  <url>
    <loc>${BASE_URL}${route}</loc>
  </url>`
  )
  .join('\n')}
</urlset>`;

const publicPath = path.join(__dirname, 'public');
const sitemapPath = path.join(publicPath, 'sitemap.xml');

fs.writeFileSync(sitemapPath, sitemap);

console.log(`✅ sitemap.xml generated with ${allRoutes.length} routes.`);

