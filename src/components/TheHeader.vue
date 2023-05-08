<template>
  <div class="the-header">
    <div class="the-header__container">
      <img
        src="@/assets/logo.svg"
        class="the-header__logo"
        alt="logo"
      />

      <div class="the-header__buttons">
        <BaseButton text="Users" />
        <BaseButton text="Sign up" />
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
export default class TheHeader extends Vue {}
</script>

<style lang="scss" scoped>
.the-header {
  position: fixed;
  display: flex;
  justify-content: center;
  padding: 36px 46px 16px;
  width: 100vw;
  padding: 13px 60px;
  background-color: $white;
  z-index: 100;

  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1024px;
  }

  &__buttons {
    :not(:last-child) {
      margin-right: 10px;
    }
  }
}
</style>
