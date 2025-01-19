<script setup>
import { ref } from 'vue';
import StepOneForm from './components/StepOneForm.vue';
import StepTwoForm from './components/StepTwoForm.vue';
import StepThreeForm from './components/StepThreeForm.vue';
import StepFourForm from './components/StepFourForm.vue';

const currentStep = ref(1);
const userType = ref('');
const formData = ref({});

const nextStep = (data) => {
  if (data) {
    if (data.userType) userType.value = data.userType;
    formData.value = { ...formData.value, ...data };
  }
  if (currentStep.value < 4) {
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
};

</script>

<template>
  <div class="app">
    <StepOneForm v-if="currentStep === 1" @next="nextStep" />
    <StepTwoForm v-if="currentStep === 2" @next="nextStep" @back="prevStep" :userType="userType" :formData="formData" />
    <StepThreeForm v-if="currentStep === 3" @next="nextStep" @back="prevStep" :formData="formData"
      :userType="userType" />
    <StepFourForm v-if="currentStep === 4" @next="nextStep" @back="prevStep" :formData="formData"
      :userType="userType" />
  </div>
</template>
