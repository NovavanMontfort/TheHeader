export default defineNitroPlugin((nitro) => {
  if (process.env.NODE_ENV !== 'production') return;

  // nitro.hooks.hook('render:html', (html) => {
  //   const titleEndIndex = html.head[0].indexOf('</title>');
  //   if (titleEndIndex !== -1) {
  //     const scriptTag = '\n<script src="https://cdn.cookiecode.nl/dist/latest.js" defer></script>';
  //     html.head[0] = html.head[0].slice(0, titleEndIndex + 8) + scriptTag + html.head[0].slice(titleEndIndex + 8);
  //   }
  // });
});
