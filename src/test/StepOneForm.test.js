import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import StepOneForm from '../components/StepOneForm.vue' 

describe('StepOneForm', () => {
  it('deve exibir um alerta se os campos não forem preenchidos', async () => {
    const wrapper = mount(StepOneForm)

    window.alert = vi.fn() 

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(window.alert).toHaveBeenCalledWith('Por favor, preencha todos os campos.')
  })

  it('deve exibir um alerta se o e-mail for inválido', async () => {
    const wrapper = mount(StepOneForm)

    window.alert = vi.fn()

    await wrapper.find('input#email').setValue('emailinvalido')
    await wrapper.find('input#pf').setChecked()

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(window.alert).toHaveBeenCalledWith('Por favor, insira um e-mail válido.')
  })

  it('deve emitir o evento "next" com os dados corretos se os campos forem válidos', async () => {
    const wrapper = mount(StepOneForm)

    window.alert = vi.fn()

    await wrapper.find('input#email').setValue('teste@teste.com')
    await wrapper.find('input#pf').setChecked()

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(wrapper.emitted('next')).toBeTruthy()
    expect(wrapper.emitted('next')[0]).toEqual([{ email: 'teste@teste.com', userType: 'pf' }])
  })

  it('deve atualizar a etapa corretamente', () => {
    const wrapper = mount(StepOneForm)
    const stepText = wrapper.find('.currentStep').text()

    expect(stepText).toBe('1')
  })
})
