import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import StepTwoForm from '../components/StepTwoForm.vue'; 

describe('StepTwoForm', () => {
  it('deve renderizar o formulário de Pessoa Física corretamente', async () => {
    const wrapper = mount(StepTwoForm, {
      props: {
        userType: 'pf',
      },
    })

    expect(wrapper.text()).toContain('Pessoa Física')

    expect(wrapper.find('#name').exists()).toBe(true)
    expect(wrapper.find('#cpf').exists()).toBe(true)
    expect(wrapper.find('#birthdate').exists()).toBe(true)
    expect(wrapper.find('#phone').exists()).toBe(true)
  })

  it('deve renderizar o formulário de Pessoa Jurídica corretamente', async () => {
    const wrapper = mount(StepTwoForm, {
      props: {
        userType: 'pj',
      },
    })

    expect(wrapper.text()).toContain('Pessoa Jurídica')

    expect(wrapper.find('#companyName').exists()).toBe(true)
    expect(wrapper.find('#cnpj').exists()).toBe(true)
    expect(wrapper.find('#openingDate').exists()).toBe(true)
    expect(wrapper.find('#companyPhone').exists()).toBe(true)
  })

  it('deve formatar corretamente o CPF', async () => {
    const wrapper = mount(StepTwoForm, {
      props: {
        userType: 'pf',
      },
    })

    const cpfInput = wrapper.find('#cpf')
    await cpfInput.setValue('12345678901')

    expect(cpfInput.element.value).toBe('123.456.789-01')
  })

  it('deve formatar corretamente o CNPJ', async () => {
    const wrapper = mount(StepTwoForm, {
      props: {
        userType: 'pj',
      },
    })

    const cnpjInput = wrapper.find('#cnpj')
    await cnpjInput.setValue('12345678000195')

    expect(cnpjInput.element.value).toBe('12.345.678/0001-95')
  })
})
