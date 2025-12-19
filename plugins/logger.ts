export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.config.warnHandler = (msg: string, instance: ComponentPublicInstance | null, trace: string) => {
      console.warn("WARN: ", msg, trace.split('\n').splice(0,5).join('\n'));
    }
  })