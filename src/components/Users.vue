<template>
  <div class="users">
    <h1 class="users__title">Working with GET request</h1>

    <BasePreloader v-if="isShowPreloader" />

    <template v-else>
      <div class="users__list">
        <div
          v-for="user in users"
          class="user"
          :key="user.id"
        >
          <img
            :src="user.photo"
            class="user__photo"
            alt="photo"
          />

          <p class="user__name">{{ user.name }}</p>
          <p class="user__position">{{ user.position }}</p>
          <p class="user__email">{{ user.email }}</p>
          <p class="user__phone">
            {{ userPhoneFormatted(user.phone) }}
          </p>
        </div>
      </div>

      <BaseButton
        v-if="isNextPageExist"
        @click.native="showNextUserPage"
        text="Show more"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BaseButton from '@/components/baseComponents/BaseButton.vue'
import BasePreloader from '@/components/baseComponents/BasePreloader.vue'
import { getUsers } from '@/api/mainRequests'

@Component({
  components: { BaseButton, BasePreloader },
})
export default class Users extends Vue {
  currentUsersPage = 1
  users: Array<Record<string, any>> = []
  isNextPageExist = false
  isShowPreloader = true

  showNextUserPage(): void {
    this.currentUsersPage += 1
    this.rewriteUsersArray()
  }
  userPhoneFormatted(userPhone: string): string {
    const phoneRegEx = /^(\+38)(\d{3})(\d{3})(\d{2})(\d{2})$/

    return userPhone.replace(phoneRegEx, '$1 ($2) $3 $4 $5')
  }
  async rewriteUsersArray(): Promise<void> {
    try {
      this.isShowPreloader = true
      const { data } = await getUsers(this.currentUsersPage)
      this.users = data.users
      this.isNextPageExist = Boolean(data.links.next_url)
      this.isShowPreloader = false
    } catch (error: any) {
      console.log(error.massage)
    }
  }

  mounted(): void {
    this.rewriteUsersArray()
  }
}
</script>

<style lang="scss" scoped>
.users {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 60px;

  ::v-deep {
    .base-preloader {
      height: 600px;
    }
  }

  &__title {
    margin-bottom: 50px;
    text-align: center;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(282px, 1fr));
    gap: 29px;
    width: 100%;
    margin-bottom: 50px;
  }

  .user {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: $white;
    border-radius: 10px;

    &__photo {
      height: 70px;
      width: 70px;
      margin-bottom: 20px;
      border-radius: 50%;
    }

    &__name {
      margin-bottom: 20px;
    }

    p {
      display: block;
      max-width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>
