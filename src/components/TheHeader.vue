<template>
  <div class="the-header">
    <div class="the-header__container">
      <img
        src="@/assets/logo.svg"
        class="the-header__logo"
        alt="logo"
      />

      <div class="the-header__buttons">
        <BaseButton
          @click.native="emitScroll('users')"
          text="Users"
        />
        <BaseButton
          @click.native="emitScroll('signUp')"
          text="Sign up"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BaseButton from '@/components/baseComponents/BaseButton.vue'

@Component({
  components: { BaseButton },
})
export default class TheHeader extends Vue {
  emitScroll(element: string): void {
    this.$emit('scrollPush', element)
  }
}
</script>

<style lang="scss" scoped>
.the-header {
  position: fixed;
  display: flex;
  justify-content: center;
  width: 100vw;
  background-color: $white;
  z-index: 100;

  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1024px;
    padding: 13px 60px;
  }

  &__logo {
    width: 104px;
    height: 26px;
  }

  &__buttons {
    :not(:last-child) {
      margin-right: 10px;
    }
  }
}

@media screen and (max-width: 1023px) {
  .the-header {
    &__container {
      padding: 13px 32px;
    }
  }
}

@media screen and (max-width: 767px) {
  .the-header {
    &__container {
      padding: 13px 16px;
    }
  }
}
</style>
