<template>
  <div
    class="TekstLinkItemsContentBlock"
    :class="'bg-' + backgroundColor"
  >
    <div
      class="grid grid-pad flex sm-flex-column"
      :class="{ 'flex-row-reverse': content.weergave == 'right' }"
    >
      <ContentblockHeadingTypeComponent
        class="sm-col-1-1 col-5-12 heading-1 no-p block-title"
        visual-size="h1"
        :title="content.titel"
        :idx="idx"
      />

      <div class="sm-col-1-1 sm-push-0 col-5-12 push-1-12 no-p">
        <div
          class="border"
          data-aos="fade-right"
        />
        <div
          class="intro-text"
          data-aos="fade-up"
          v-html="content.tekst"
        />
        <ContentblockButton
          v-if="content.knop?.link && content.knop?.name"
          class="btn-secondary"
          :name="content.knop.name"
          :link="content.knop.link"
          :target="content.knop.target"
          has-icon
        />
      </div>

      <div class="link-items">
        <a
          v-for="(item, index) in filteredItems"
          :key="index"
          class="item"
          :class="{ 'no-pointer': item.link == '' }"
          :href="item.link"
        >
          <p
            class="number"
            data-aos="fade-right"
            :data-aos-delay="200 + index * 200"
            v-text="item.nummer"
          />
          <span
            class="title"
            data-aos="fade-right"
            :data-aos-delay="400 + index * 200"
          >
            <span>
              {{ item.title }}
            </span>
            <i
              v-if="item.link !== ''"
              class="icon icon-arrow-right"
            />
          </span>
          <div
            class="text"
            data-aos="fade-right"
            :data-aos-delay="400 + index * 200"
            v-html="item.text"
          />
        </a>
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

  idx: {
    type: Number,
    required: true,
  },
});

const backgroundColor = props.content.achtergrondkleur != null ? props.content.achtergrondkleur : 'black';

const filteredItems = computed(() => {
  const items: { nummer: string; title: string; text: string; link: string }[] = [];

  for (let i = 1; i <= 5; i++) {
    const nummer = props.content[`stap${i}Nummer`];
    const title = props.content[`stap${i}Titel`];
    const text = props.content[`stap${i}Tekst`];
    const link = props.content[`stap${i}Link`];

    if (title || text) {
      items.push({ nummer, title, text, link });
    }
  }

  return items;
});
</script>

<style lang="scss" scoped>
.TekstLinkItemsContentBlock {
  position: relative;
  padding-top: 14rem;
  padding-bottom: 14rem;

  &.bg-white,
  &.bg-brown,
  &.bg-yellow,
  &.bg-pink,
  &.bg-blue {
    color: $black;

    .border {
      border-color: $black;
    }

    .link-items .item {
      color: $black;
      border-color: $black;

      .number::after {
        background-color: $black;
      }
    }

    .btn {
      color: $black;
      border: 0.1rem solid $black;

      &:hover {
        background-color: $black;
        color: $white;
      }
    }
  }

  .block-title {
    margin-left: -0.4rem;
  }

  .no-pointer {
    pointer-events: none;
  }

  .intro-text:deep(p) {
    font-size: 2.6rem;

    a {
      text-decoration: underline;

      &:hover {
        text-decoration: none;
      }
    }
  }

  .btn {
    color: $white;
    border: 0.1rem solid $white;

    &:hover {
      background-color: $white;
      color: $black;
    }
  }

  .link-items {
    display: flex;
    justify-content: space-between;
    gap: 7.6rem;
    padding-top: 12rem;
    width: 94%;

    .item {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      color: $white;
      text-decoration: none;

      .number {
        position: relative;
        padding-bottom: 3.2rem;
        margin-bottom: 3.2rem;
        font-family: $font-inter;
        font-feature-settings:
          'ss02' on,
          'salt' on;
        font-weight: 400;
        font-size: 2rem;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 0.2rem;
          background-color: $white;
        }
      }

      .title {
        display: inline-block;
        font-size: 2.6rem;
        font-weight: 600;
        text-wrap: balance;

        span {
          vertical-align: middle;
        }

        .icon {
          display: inline-block;
          margin-left: 2.4rem;
          vertical-align: middle;
          transform: translateX(0);
          transition: 0.3s ease-in-out;
        }
      }

      .text {
        margin-top: 2.2rem;

        :deep(p) {
          a {
            text-decoration: underline;

            &:hover {
              text-decoration: none;
            }
          }
        }
      }

      &:hover {
        .title .icon {
          transform: translateX(1rem);
        }
      }
    }
  }
}

.border {
  margin-top: 8rem;
  margin-bottom: 21rem;
  width: 16rem;
  border-top: 0.2rem solid $white;
}

@include media(sm) {
  .TekstLinkItemsContentBlock {
    padding-top: 6.4rem;
    padding-bottom: 6.4rem;

    .block-title {
      margin-left: -0.2rem;
    }

    .intro-text:deep(p) {
      font-size: 2.2rem;
    }

    .link-items {
      flex-direction: column;
      padding-top: 6.4rem;
      gap: 4.8rem;

      .item {
        flex-direction: row;
        align-items: center;
        gap: 2.4rem;
        padding-top: 2.4rem;
        border-top: 0.1rem solid $white;

        .number {
          padding: 0;
          margin: 0;

          &::after {
            display: none;
          }
        }

        .title {
          font-size: 2.4rem;
        }

        .text {
          display: none;
        }
      }
    }
  }
  .border {
    margin-top: 3.2rem;
    margin-bottom: 3.2rem;
  }
}
</style>
