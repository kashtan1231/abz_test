<template>
  <div id="app">
    <TheHeader @scrollPush="scrollTo" />
    <div class="page">
      <Hero @scrollPush="scrollTo" />
      <Users
        ref="users"
        @scrollPush="scrollTo"
      />
      <UserRegistration
        ref="signUp"
        @scrollPush="scrollTo"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TheHeader from '@/components/TheHeader.vue'
import Hero from '@/components/Hero.vue'
import Users from '@/components/Users.vue'
import UserRegistration from '@/components/UserRegistration.vue'

@Component({
  components: {
    TheHeader,
    Hero,
    Users,
    UserRegistration,
  },
})
export default class App extends Vue {
  $refs!: {
    [key: string]: Vue
  }

  scrollTo(ref: any) {
    this.$refs[ref].$el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
}
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  background-color: $gray;
  font-family: $font-family-default, Arial;
  font-style: normal;
  font-weight: 400;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

button {
  border: none;
  background-color: transparent;
  cursor: pointer;
}

input {
  border: none;
  outline: none;
  background-color: transparent;
}

.page {
  width: 100%;
  max-width: 1024px;
  padding: 60px 0 100px;

  > :not(:last-child) {
    margin-bottom: 140px;
  }
}
</style>
