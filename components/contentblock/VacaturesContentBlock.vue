<template>
  <div class="VacaturesContentBlock grid">
    <div class="col-1-1">
      <h4
        v-if="content.label"
        class="title-label btn btn-primary"
      >
        <span class="btn-text">{{ content.label }}</span>
        <span class="btn-icon" />
      </h4>

      <div
        v-for="vacature in vacatures"
        :key="vacature._id"
        data-aos="fade-up"
      >
        <div
          class="vacancy"
          data-aos="fade-up"
        >
          <div class="vacancy-inner clearfix">
            <NuxtLink
              :to="vacature._url"
              class="title col-1-1 no-p"
            >
              <h2 v-html="vacature.content.titel" />
            </NuxtLink>
            <div class="col-10-12 no-p sm-col-1-1 intro">
              <span v-html="vacature.content.inleiding" />
            </div>
            <div class="col-1-1 no-p">
              <ContentblockButton
                v-if="vacature._url"
                class="btn-secondary"
                :name="baseGetTranslation('Bekijk vacature')"
                :link="vacature._url"
                has-icon
                has-hover-animation
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  content: {
    type: Object,
    required: true,
  },
});

interface Vacature {
  _id: number;
  _url: string;
  content: {
    slug: string;
    titel: string;
    inleiding: string;
  };
}

const vacatures = ref<Vacature[]>([]);

if (props.content.aanvullenMet) {
  const { data } = await useBaseFetch(`/pages/${props.content.aanvullenMet}`, { method: 'POST', body: {}});

  vacatures.value  = data.value?.pages
      .sort((a, b) => b._id - a._id)
      .map((item) => ({
        ...item,
        subtitel: item.inleiding,
      }));
}


</script>

<style lang="scss" scoped>
.title-label {
  margin: 0 0 2rem 0;

  @media screen and (min-width: ($screen-xs)) {
    position: absolute;
    left: -$gutter;
    top: 0.1rem;
    transform: rotate(-90deg) translate(-100%, -100%);
    transform-origin: left top;
    margin: 0;
  }
}

.vacancy {
  width: 100%;
  border-top: 0.2rem solid;

  .vacancy-inner {
    width: 100%;
    padding: 5rem 0;
    position: relative;

    a {
      text-decoration: none;
    }

    .title {
      text-decoration: none;

      h2 {
        :deep(p) {
          margin: 0;
          font-size: 5.6rem;
        }
      }
    }

    .intro {
      padding: 2rem 0;
    }
  }
}
</style>
