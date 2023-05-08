<template>
  <div
    class="base-radio-button"
    @click="selectButton"
  >
    <div
      :class="[
        'base-radio-button__point',
        { 'selected-point': isButtonSelected },
      ]"
    ></div>
    <p class="base-radio-button__text">{{ name }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class BaseRadioButton extends Vue {
  @Prop({ default: '' }) name!: string
  @Prop({ default: null }) id!: number
  @Prop({ default: false }) isButtonSelected!: boolean

  selectButton(): void {
    this.$emit('selectButton', this.id)
  }
}
</script>

<style lang="scss" scoped>
.base-radio-button {
  display: flex;
  align-items: center;

  &__point {
    margin-right: 12px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    box-shadow: inset 0 0 0 1px $gray-dark;
  }
}

.selected-point {
  position: relative;
  box-shadow: inset 0 0 0 1px $blue;

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: $blue;
  }
}
</style>
