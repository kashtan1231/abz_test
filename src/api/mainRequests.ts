import store from '../store'
import { instanceApi } from './instance'
import { AxiosResponse } from 'axios'

// Get list of registrated users
export const getUsers = (page: number): Promise<AxiosResponse> => {
  return instanceApi.get(`users?page=${page}&count=6`)
}

// Get list of positions for registration
export const getPositions = (): Promise<AxiosResponse> => {
  return instanceApi.get('positions')
}

// Get token for registration
export const getToken = (): Promise<AxiosResponse> => {
  return instanceApi.get('token')
}

// Register new user
export const registerUser = async (payload: any): Promise<void> => {
  const { data } = await getToken()
  instanceApi.defaults.headers.common.token = data.token
  await instanceApi.post('users', payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  const newUsers = await getUsers(1)
  store.commit('userList/setUsers', newUsers.data.users)
}
