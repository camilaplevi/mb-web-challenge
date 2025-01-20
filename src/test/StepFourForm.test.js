import { mount } from '@vue/test-utils';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import StepFourForm from '../components/StepFourForm.vue';

global.fetch = vi.fn();

describe('StepFourForm.vue', () => {
  let wrapper;
  const formData = {
    email: 'test@example.com',
    name: 'John Doe',
    cpf: '12345678900',
    birthdate: '2000-01-01',
    phone: '123456789',
    password: 'password123',
  };

  const userType = 'pf'; 

  beforeEach(() => {
    wrapper = mount(StepFourForm, {
      props: {
        userType,
        formData,
      },
    });
  });

  it('should render form fields correctly for pf user type', () => {
    expect(wrapper.find('#email').exists()).toBe(true);
    expect(wrapper.find('#name').exists()).toBe(true);
    expect(wrapper.find('#cpf').exists()).toBe(true);
    expect(wrapper.find('#birthdate').exists()).toBe(true);
    expect(wrapper.find('#phone').exists()).toBe(true);
    expect(wrapper.find('#password').exists()).toBe(true);
  });

  it('should toggle password visibility when clicked', async () => {
    const passwordInput = wrapper.find('#password');
    const toggleButton = wrapper.find('.toggle-button');

    expect(passwordInput.attributes('type')).toBe('password');

    await toggleButton.trigger('click');
    expect(passwordInput.attributes('type')).toBe('text');

    await toggleButton.trigger('click');
    expect(passwordInput.attributes('type')).toBe('password');
  });

  it('should emit "back" when back button is clicked', async () => {
    const backButton = wrapper.find('#back');
    await backButton.trigger('click');
    expect(wrapper.emitted().back).toBeTruthy();
  });
});
