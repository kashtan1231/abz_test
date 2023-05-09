<template>
  <div class="base-input">
    <label
      :class="[
        'base-input__label',
        { 'move-label': isInputFocused || value, 'error-label': isShowError },
      ]"
      for="field-input"
      >{{ label }}</label
    >
    <input
      :class="['base-input__field-input', { 'error-input': isShowError }]"
      @input="onInput"
      @focus="focusInput"
      @blur="unfocusInput"
      :value="value"
      :type="type"
      id="field-input"
    />
    <p
      v-if="helper && !isShowError"
      class="base-input__helper"
    >
      {{ helper }}
    </p>
    <p
      v-if="isShowError"
      class="base-input__error"
    >
      {{ error }}
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class BaseInput extends Vue {
  @Prop({ default: 'text' }) type!: string
  @Prop({ default: '' }) value!: string
  @Prop({ default: '' }) label!: string
  @Prop({ default: '' }) helper!: string
  @Prop({ default: '' }) error!: string
  @Prop({ default: null }) maxLength!: number
  @Prop({ default: false }) errorCondition!: boolean

  isInputWasClicked = false
  isInputFocused = false

  get isShowError(): boolean {
    return this.errorCondition && this.isInputWasClicked && !this.isInputFocused
  }

  focusInput(): void {
    this.isInputWasClicked = true
    this.isInputFocused = true
  }
  unfocusInput(): void {
    this.isInputFocused = false
  }
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement

    if (this.maxLength) target.value = target.value.slice(0, this.maxLength)

    if (this.type === 'tel') {
      target.value = target.value
        .replace('+38 (0', '')
        .replace(/\D/g, '')
        .slice(0, 9)
      const phoneRegex = /^(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})$/

      target.value = target.value.replace(
        phoneRegex,
        (_match, p1, p2, p3, p4) => {
          const formattedNumber = []

          if (p1) {
            formattedNumber.push(`+38 (0${p1}`)
          }
          if (p2) {
            formattedNumber.push(`) ${p2}`)
          }
          if (p3) {
            formattedNumber.push(` ${p3}`)
          }
          if (p4) {
            formattedNumber.push(` ${p4}`)
          }

          return formattedNumber.join('')
        }
      )
    }

    this.$emit('input', target.value)
  }
}
</script>

<style lang="scss" scoped>
.base-input {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 380px;

  &__label {
    @extend p;
    position: absolute;
    top: 14px;
    left: 16px;
    padding: 0 4px;
    border-radius: 30px;
    background-color: $gray;
    color: $gray-dark;
    transition-duration: 0.2s;
    user-select: none;
    pointer-events: none;
  }

  &__field-input {
    @extend p;
    padding: 14px 16px;
    border-radius: 4px;
    box-shadow: inset 0 0 0 1px $gray-dark;

    &::placeholder {
      color: $gray-dark;
    }
  }

  &__helper {
    margin-top: 4px;
    padding-left: 16px;
    color: $gray-dark;
    font-size: 12px;
    line-height: 14px;
  }

  &__error {
    margin-top: 4px;
    padding-left: 16px;
    color: $red;
    font-size: 12px;
    line-height: 14px;
  }
}

.move-label {
  top: -7px;
  left: 12px;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
}

.error-label {
  color: $red;
}

.error-input {
  box-shadow: inset 0 0 0 2px $red;
}
</style>
