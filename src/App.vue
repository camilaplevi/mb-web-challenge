<template>
  <div class="app">
    <StepOneForm v-if="currentStep === 1" @next="nextStep" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import StepOneForm from './components/StepOneForm.vue';

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

<style>

</style>