export default {
  namespaced: true,
  state: {
    users: [],
  },
  mutations: {
    setUsers(state: any, users: Array<Record<string, any>>): void {
      state.users = users
    },
  },
}
