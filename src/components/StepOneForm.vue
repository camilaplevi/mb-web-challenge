<template>
  <div>
    <p>Etapa 1 de 4</p>
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

const next = () => {
  if (email.value && picked.value) {
    const formData = { email: email.value, userType: picked.value }
    emit('next', formData);
  } else {
    alert('Por favor, preencha todos os campos.')
  }
};

</script>

<style scoped lang="sass">

button
  width: 100%

#userType
  display: flex
  align-items: center
  gap: 16px // Espaçamento entre os botões de rádio e os rótulos

  input[type="radio"]
    appearance: none // Remove o estilo padrão do botão de rádio
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
      transform: translate(-50%, -50%) // Centraliza a bolinha interna

label
  cursor: pointer
  font-weight: bold // Realce nos rótulos

</style>