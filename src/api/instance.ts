import axios from 'axios'

export const actualUrl = (): any => {
  return 'https://frontend-test-assignment-api.abz.agency/api/v1/'
}

const defaultHeaders: any = {
  accept: 'application/json',
}

export const instanceApi = axios.create({
  baseURL: actualUrl(),
  headers: defaultHeaders,
})
