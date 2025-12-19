export default defineNuxtPlugin(() => {
  const { proxy } = useScriptGoogleTagManager();

  useScriptEventPage((info) => {
    proxy.dataLayer.push({
      event: 'custom_pageview',
      page_title: info.title,
      page_path: info.path,
    });
  });
});
