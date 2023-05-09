<template>
  <div class="base-upload">
    <input
      v-show="false"
      @change="changeName"
      type="file"
      id="fake-button"
    />

    <div :class="['base-upload__container', { 'border-error': error }]">
      <label
        :class="['base-upload__button', { 'border-error': error }]"
        for="fake-button"
        >Upload</label
      >
      <div class="base-upload__name">{{ name }}</div>
    </div>
    <p
      v-if="error"
      class="base-upload__error"
    >
      {{ error }}
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class BaseUpload extends Vue {
  @Prop({ default: '' }) error!: string
  @Prop({ default: '' }) name!: string

  changeName(event: any): void {
    this.$emit('changeName', event)
  }
}
</script>

<style lang="scss" scoped>
.base-upload {
  position: relative;
  width: 100%;
  max-width: 380px;

  &__container {
    display: flex;
    border-radius: 4px;
    box-shadow: inset 0 0 0 1px $gray-dark;
  }

  &__button {
    padding: 14px 16px;
    border-radius: 4px 0 0 4px;
    box-shadow: inset 0 0 0 1px $black;
    cursor: pointer;
  }

  &__name {
    width: 100%;
    padding: 14px 16px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &__error {
    position: absolute;
    top: calc(100% + 4px);
    left: 16px;
    color: $red;
    font-size: 12px;
    line-height: 14px;
  }
}

.error {
  color: $red;
}

.border-error {
  box-shadow: inset 0 0 0 2px $red;
}
</style>
