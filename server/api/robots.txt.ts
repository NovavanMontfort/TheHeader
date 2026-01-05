export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  let robotsTxt = '';

  if (config.public.indexSite) {
    robotsTxt = `User-agent: *
    \nAllow: /\n\n`;

    robotsTxt += `Sitemap: ${config.public.siteUrl}/api/sitemap.xml\n`;
  } else {
    robotsTxt = `User-agent: *
    \nDisallow: /\n\n`;
  }

  event.node.res.setHeader('Content-Type', 'text/plain');

  return robotsTxt;
});
