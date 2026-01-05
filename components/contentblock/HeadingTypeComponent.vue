<template>
  <div>
    <component
      :is="seoHeadingtype"
      v-if="title"
      :id="`title-${idx}`"
      :key="title"
      ref="container"
      class="title-animation ContentblockHeadingTypeComponent"
      :class="[contentBlockHeaderClass()]"
    >
      <span
        v-for="(titlePart, index) in dividedTitle"
        :key="index"
      >
        <span v-html="titlePart" /> &nbsp;
      </span>
    </component>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },

  visualSize: {
    type: String,
    default: '',
  },

  headingType: {
    type: String,
    default: 'h2',
  },

  idx: {
    type: Number,
    default: 0,
  },
});

const cleanTitle = props.title?.replace(/&nbsp;|<\/?p>|<\/?strong>/g, ' '); // unfortunately, the title is sometimes wrapped in <p> or <strong> tags, because of old styling of cre8ion
const container = ref();
const options = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const seoHeadingtype = computed(() => (options.includes(props.headingType) ? props.headingType : props.idx == 0 ? 'h1' : 'h2'));
const dividedTitle = computed(() => cleanTitle.split(' ').filter((part) => part !== ''));

const opmaakOptions: Record<string, string> = {
  h1: 'heading-1',
  h2: 'heading-2',
  h3: 'heading-3',
  h4: 'heading-4',
};

function contentBlockHeaderClass() {
  const size = props.visualSize ? props.visualSize : props.headingType;
  return opmaakOptions[size] || 'heading-2';
}

onMounted(() => {
  if (!props.title) return;
  
  const targetElement = document?.querySelector(`#title-${props.idx}`);
  if (!targetElement) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          container.value?.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  if (container.value) {
    observer?.observe(document?.querySelector(`#title-${props.idx}`) as Element);
  } else {
    console.error('HeadingTypeComponent: No container found');
  }
});
</script>
