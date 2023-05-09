import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseInput from './BaseInput.vue'

describe('BaseInput', () => {
  it('renders label when passed', () => {
    const label = 'Name'
    const wrapper = mount(BaseInput, {
      propsData: { label },
    })
    expect(wrapper.find('label').text()).toMatch(label)
  })

  it('renders helper when passed', () => {
    const helper = 'Enter your name'
    const wrapper = mount(BaseInput, {
      propsData: { helper },
    })
    expect(wrapper.find('.base-input__helper').text()).toMatch(helper)
  })

  it('renders error when passed errorCondition is true and input is blurred', async () => {
    const error = 'Name is required'
    const wrapper = mount(BaseInput, {
      propsData: { error, errorCondition: true },
    })

    expect(wrapper.find('.base-input__error').exists()).toBe(false)
    await wrapper.find('input').trigger('focus')
    await wrapper.find('input').trigger('blur')
    expect(wrapper.find('.base-input__error').text()).toMatch(error)
  })
})
