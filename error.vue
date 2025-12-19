<template>
  <div class="errorPage">
    <main v-if="content?.content?.content">
      <ContentBlockContainer :contentblocks="content.content.content" />
    </main>
  </div>
</template>

<script setup lang="ts">
  const error = useError()
  const statusCode = error.value?.statusCode
  const content = await baseGetErrorPage(statusCode)

  if (content.metadata.title) {
    const meta = await baseMapMeta(content.metadata)
    useSeoMeta({ ...meta })
  }
</script>
