<template>
  <div class="app">
    <StepOneForm v-if="currentStep === 1" @next="nextStep" />
    <StepTwoForm v-if="currentStep === 2" @next="nextStep" @back="prevStep" :userType="userType"/>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import StepOneForm from './components/StepOneForm.vue';
import StepTwoForm from './components/StepTwoForm.vue';

const currentStep = ref(1);
const userType = ref('');

const nextStep = (formData) => {
  if (formData) {
    if (formData.userType) {
      userType.value = formData.userType; 
    }
  }
  if (currentStep.value < 4) {
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

</script>