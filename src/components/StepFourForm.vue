<template>
    <div>
      <p>Etapa 4 de 4</p>
      <h2>Revise suas informações</h2>
  
      <form @submit.prevent="submitForm">
        <!-- Exibir todos os campos para revisão -->
        <div v-for="(value, key) in formData" :key="key" class="form-group">
          <label :for="key">{{ label(key) }}</label>
          <input
            v-if="key !== 'password'"  
            type="text"
            :id="key"
            v-model="formData[key]"
            :required="true"
          />
          <input
            v-else
            type="password"
            :id="key"
            v-model="formData[key]"
            :required="true"
          />
        </div>
  
        <div class="buttons">
          <button type="button" @click="back">Voltar</button>
          <button type="submit">Cadastrar</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits } from 'vue';
  
  const emit = defineEmits(['back', 'submit']);
  
  const formData = ref({
    email: '',    // Assumindo que o Passo 1 tem o campo email
    username: '', // Assumindo que o Passo 2 tem o campo username
    password: '', // Campo do Passo 3
  });
  
  const label = (key) => {
    const labels = {
      email: 'E-mail',
      username: 'Nome de usuário',
      password: 'Senha de acesso',
    };
    return labels[key] || key;
  };
  
  const back = () => {
    emit('back');
  };
  
  const submitForm = () => {
    // Validação: Verificar se todos os campos estão preenchidos corretamente
    const isValid = Object.values(formData.value).every((field) => field.trim() !== '');
  
    if (!isValid) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }
  
    // Validação adicional se necessário, como formato de e-mail, etc.
    if (!/\S+@\S+\.\S+/.test(formData.value.email)) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }
  
    // Enviar dados para a API
    emit('submit', formData.value);
  };
  </script>
  
  <style scoped lang="sass">
  .form-group
    margin-bottom: 1rem
  
  label
    display: block
    font-weight: bold
  
  input
    width: 100%
    padding: 8px
    margin-top: 4px
    border: 1px solid #ccc
    border-radius: 4px
  
  .buttons
    display: flex
    justify-content: space-between
    margin-top: 2rem
  
  button
    width: 48%
  </style>
  