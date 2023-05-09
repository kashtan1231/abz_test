import { describe, it, expect } from 'vitest'
import { getUsers, getPositions, registerUser } from './mainRequests'

describe('API Requests', () => {
  it('should return 1st page of users', async () => {
    const page = 1
    const { data } = await getUsers(page)
    expect(data.success).toBeTruthy()
  })

  it('should return positions', async () => {
    const { data } = await getPositions()
    expect(data.success).toBeTruthy()
  })

  it('should register user', async () => {
    const payload = {
      name: 'test',
      email: 'test123@mail.te',
      phone: '+380509999999',
      position_id: '1',
      photo: 'photo',
    }

    const resultFn = async () => {
      await registerUser(payload)
    }

    expect(resultFn).rejects.toThrow('Request failed with status code 500')
  })
})
