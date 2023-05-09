import { describe, it, expect } from 'vitest'
import { getUsers } from './mainRequests'

describe('API Requests', () => {
  it('should return 1st page of users', async () => {
    const page = 1
    const { data } = await getUsers(page)
    expect(data.success).toBeTruthy()
  })
})
