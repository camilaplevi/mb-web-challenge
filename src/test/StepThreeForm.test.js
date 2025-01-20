import { mount } from '@vue/test-utils'
import StepThreeForm from '../components/StepThreeForm.vue' 

describe('StepThreeForm.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(StepThreeForm)
  })

  it('should emit "back" when back button is clicked', async () => {
    const backButton = wrapper.find('#back');
    await backButton.trigger('click');
    expect(wrapper.emitted().back).toBeTruthy();
  });
})
