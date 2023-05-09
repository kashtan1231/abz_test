<template>
  <div class="hero">
    <h1 class="hero__title">Test assignment for front-end developer</h1>
    <p class="hero__description">
      What defines a good front-end developer is one that has skilled knowledge
      of HTML, CSS, JS with a vast understanding of User design thinking as
      they'll be building web interfaces with accessibility in mind. They should
      also be excited to learn, as the world of Front-End Development keeps
      evolving.
    </p>
    <BaseButton
      @click.native="emitScroll('signUp')"
      text="Sign up"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BaseButton from '@/components/baseComponents/BaseButton.vue'

@Component({
  components: { BaseButton },
})
export default class Hero extends Vue {
  emitScroll(element: string): void {
    this.$emit('scrollPush', element)
  }
}
</script>

<style lang="scss" scoped>
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 164px 16px;
  background-image: url(../assets/hero-bg.jpg);

  &__title,
  &__description {
    max-width: 380px;
    color: $white;
    text-align: center;
  }

  &__title {
    margin-bottom: 21px;
  }

  &__description {
    margin-bottom: 32px;
  }
}
</style>
