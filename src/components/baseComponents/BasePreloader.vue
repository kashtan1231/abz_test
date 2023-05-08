<template functional>
  <div class="base-preloader">
    <img
      class="base-preloader__img"
      src="@/assets/preloader.svg"
      alt="preloader"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class BasePreloader extends Vue {}
</script>

<style lang="scss" scoped>
.base-preloader {
  display: flex;
  align-items: center;

  &__img {
    height: 48px;
    width: 48px;
    animation: spin 0.5s infinite linear;

    @keyframes spin {
      from {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      to {
        -webkit-transform: rotate(359deg);
        transform: rotate(360deg);
        -webkit-transform: rotate(359deg);
        transform: rotate(360deg);
      }
    }
  }
}
</style>
