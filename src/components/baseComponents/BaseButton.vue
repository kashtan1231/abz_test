<template>
  <button
    class="base-button"
    :disabled="isDisabled"
  >
    <p>{{ text }}</p>
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class BaseButton extends Vue {
  @Prop({ default: '' }) text!: string
  @Prop({ default: false }) isDisabled!: boolean
}
</script>

<style lang="scss" scoped>
.base-button {
  min-width: 100px;
  padding: 4px 18px;
  border-radius: 80px;
  background-color: $yellow;
  transition-duration: 0.2s;

  &:hover {
    background-color: $yellow-bright;
  }

  &:disabled {
    background-color: $gray-dark;
    color: $white;
  }
}
</style>
