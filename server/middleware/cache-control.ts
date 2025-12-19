export default defineEventHandler((event) => {
  // testen: https://paulund.medium.com/add-cache-control-to-nuxt3-9bc473ad659e
  const res = event.node.res;
  const month = 2592000;
  const url = event.node.req.url;

  if (url?.includes('/api/image')) {
    res.setHeader('Cache-Control', `public, max-age=${month} s-maxage=${month}`);
    res.setHeader('Vary', 'Accept-Encoding');
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Last-Modified', new Date().toUTCString());
  }
});
