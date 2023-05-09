import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import BaseUpload from '@/components/baseComponents/BaseUpload.vue'

describe('BaseUpload.vue', () => {
  it('renders name when passed', () => {
    const name = 'test.txt'
    const wrapper = shallowMount(BaseUpload, {
      propsData: { name },
    })
    expect(wrapper.text()).toMatch(name)
  })

  it('renders error when passed', () => {
    const error = 'Error message'
    const wrapper = shallowMount(BaseUpload, {
      propsData: { error },
    })
    expect(wrapper.find('.base-upload__error').text()).toMatch(error)
  })

  it('emits changeName event when input value changes', () => {
    const wrapper = shallowMount(BaseUpload)
    const input = wrapper.find('input[type="file"]')
    const file = new File(['file contents'], 'test.txt', { type: 'text/plain' })
    input.element.files = [file]
    input.trigger('change')
    expect(wrapper.emitted('changeName')[0]).toEqual([file])
  })
})
