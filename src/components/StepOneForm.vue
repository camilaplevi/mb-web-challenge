<template>
  <div>
    <p>Etapa <span class="currentStep">{{ currentStep }}</span> de 4</p>
    <h2>Seja bem vindo(a)</h2>
    <form @submit.prevent="next">
      <label for="email">Endereço de e-mail</label>
      <input v-model="email" type="email" id="email" required />
      <div id="userType">
        <input type="radio" id="pf" value="pf" v-model="picked" required />
        <label for="pf">Pessoa física</label>
        <input type="radio" id="pj" value="pj" v-model="picked" />
        <label for="pj">Pessoa jurídica</label>
      </div>
    <button type="submit">Continuar</button>
    </form>
  </div> 
</template>

<script setup>

import { ref } from 'vue';

const email = ref('')

const picked = ref('')

const emit = defineEmits(['next'])

const currentStep = ref(1)

const next = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  if (email.value && picked.value) {
    if (!emailRegex.test(email.value)) {
      alert('Por favor, insira um e-mail válido.')
      return;
    }
    const formData = { email: email.value, userType: picked.value }
    emit('next', formData);
  } else {
    alert('Por favor, preencha todos os campos.')
  }
}

</script>

<style scoped lang="sass">

button
  width: 100%
  margin-top: 10px

#userType
  display: flex
  align-items: center
  justify-content: space-around

  label
    padding-bottom: 9px

  input[type="radio"]
    appearance: none 
    width: 16px
    height: 16px
    border: 2px solid black
    border-radius: 50%
    outline: none
    cursor: pointer
    position: relative
    background-color: white
    &:checked::after
      content: ''
      display: block
      width: 8px
      height: 8px
      border-radius: 50% 
      background-color: black
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%) 

.currentStep 
  color: orange
  font-weight: bold
  
label
  cursor: pointer

</style>