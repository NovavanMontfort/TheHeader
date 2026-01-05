import { Navigation } from '~/utils/types';

function extractUrls(arr: Navigation[]): string[] {
  return arr.flatMap((item) => [item.url, ...extractUrls(item.children || [])]);
}

export default defineEventHandler(async (event) => {
  const blackList = [54872]
  const runtimeConfig = useRuntimeConfig();

  const apiUrl = runtimeConfig.public.apiBase;
  const data = (await $fetch(`${apiUrl}/api/links`)) as Navigation[];
  const filteredData = data.filter((item) => !blackList.includes(item.id));

  const siteUrl = runtimeConfig.public.siteUrl;

  const flatUrls = extractUrls(filteredData)

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${flatUrls
      .map(
        (route: string) => `<url>
            <loc>${siteUrl}${route}</loc>
            <changefreq>daily</changefreq>
            <priority>0.8</priority>
          </url>`
      )
      .join('')}
      </urlset>
    `;

  event.node.res.setHeader('Content-Type', 'application/xml');

  return sitemap;
});
