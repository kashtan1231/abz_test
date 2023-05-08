<template>
  <div class="user-registration">
    <h1 class="user-registration__title">Working with POST request</h1>

    <div class="user-registration__form-container">
      <BaseInput
        v-model="name"
        class="user-registration__input"
        label="Your name"
        maxLength="60"
        error="Name should contain 2-60 characters"
        :errorCondition="errorName"
      />

      <BaseInput
        v-model="email"
        type="email"
        class="user-registration__input"
        label="Email"
        maxLength="100"
        error="Email must be valid"
        :errorCondition="errorEmail"
      />

      <BaseInput
        v-model="phone"
        type="tel"
        class="user-registration__input"
        label="Phone"
        helper="+38 (XXX) XXX - XX - XX"
        error="Phone must be valid"
        :errorCondition="errorPhone"
      />
      <p class="user-registration__position">Select your position</p>

      <BaseRadioButton
        v-for="position in positions"
        class="user-registration__radio-button"
        @selectButton="selectPosition"
        :key="position.id"
        :name="position.name"
        :id="position.id"
        :isButtonSelected="isButtonSelected(position.id)"
      />

      <BaseUpload
        class="user-registration__upload"
        @changeName="changeUploadedName"
        :error="errorUploadText"
        :name="nameUploadText"
      />

      <BaseButton
        class="user-registration__sign-up"
        @click.native="signUp"
        :isDisabled="isSignUpDisabled"
        text="Sign up"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BaseInput from '@/components/baseComponents/BaseInput.vue'
import BaseRadioButton from '@/components/baseComponents/BaseRadioButton.vue'
import BaseUpload from '@/components/baseComponents/BaseUpload.vue'
import BaseButton from '@/components/baseComponents/BaseButton.vue'
import { getPositions, registerUser } from '@/api/mainRequests'

@Component({
  components: {
    BaseInput,
    BaseRadioButton,
    BaseUpload,
    BaseButton,
  },
})
export default class UserRegistration extends Vue {
  name = ''
  email = ''
  phone = ''
  errorUploadText = ''
  nameUploadText = 'Upload your photo'
  selectedPosition: number | null = null
  positions: Array<Record<string, any>> = []
  fileObj: Record<string, any> = {}
  emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.\w{1,3})+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g

  get errorName(): boolean {
    return this.name.length < 2
  }
  get errorEmail(): boolean {
    return !this.emailRegex.test(this.email)
  }
  get errorPhone(): boolean {
    return this.phone.length < 19
  }
  get errorUpload(): boolean {
    return !this.fileObj?.size || Boolean(this.errorUploadText)
  }
  get isSignUpDisabled(): boolean {
    return (
      this.errorName ||
      this.errorEmail ||
      this.errorPhone ||
      !this.selectedPosition ||
      this.errorUpload
    )
  }

  isButtonSelected(id: number): boolean {
    return id === this.selectedPosition
  }
  selectPosition(id: number): void {
    this.selectedPosition = id
  }
  changeUploadedName(event: any): void {
    const value = event.target.value

    this.fileObj = event.target.files[0]
    const fileSize = this.fileObj?.size / (1024 * 1024)

    if (this.fileObj?.type !== 'image/jpeg') {
      this.errorUploadText = 'Photo must be jpeg/jpg type'
      this.nameUploadText = 'Upload your photo'
    } else if (fileSize > 5) {
      this.errorUploadText = 'Photo size must not be greater than 5 Mb'
      this.nameUploadText = 'Upload your photo'
    } else {
      this.nameUploadText = value
        ? event.target.files[0].name
        : 'Upload your photo'
      this.errorUploadText = ''
    }
  }
  async signUp(): Promise<void> {
    const payload = {
      name: this.name,
      email: this.email,
      phone: this.phone.replace(/[()\s]/g, ''),
      position_id: this.selectedPosition,
      photo: this.fileObj,
    }
    this.fileObj = {}
    const { data } = await registerUser(payload)
  }
  async rewritePositions(): Promise<void> {
    const { data } = await getPositions()
    this.positions = data.positions
  }

  mounted(): void {
    this.rewritePositions()
  }
}
</script>

<style lang="scss" scoped>
.user-registration {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__form-container {
    width: 100%;
    max-width: 380px;
  }

  &__input {
    margin-top: 50px;
  }

  &__position {
    margin: 29px 0 11px;
  }

  &__radio-button {
    &:not(:last-child) {
      margin-bottom: 7px;
    }
  }

  &__upload {
    margin-top: 48px;
  }

  &__sign-up {
    display: block;
    margin: 50px auto 0;
  }
}
</style>
