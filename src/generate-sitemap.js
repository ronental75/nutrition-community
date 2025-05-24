const SitemapGenerator = require('sitemap-generator');

// Replace with your actual website URL
const generator = SitemapGenerator('https://nutrition-community.vercel.app/', {
  stripQuerystring: false,
  filepath: './public/sitemap.xml',  // <-- Explicitly set file path
});

// Optional: event listener for debugging
generator.on('done', () => {
  console.log('✅ Sitemap created at ./public/sitemap.xml');
});

// Start the generator
generator.start();
