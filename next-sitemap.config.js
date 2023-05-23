/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://zachmontgomery.com',
  generateRobotsTxt: true, // (optional)
  generateIndexSitemap: false,
}