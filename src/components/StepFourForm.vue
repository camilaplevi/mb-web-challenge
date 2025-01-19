<script setup>
import { ref, defineProps } from 'vue';

const currentStep = ref(4);

const emit = defineEmits(['back', 'submit']);

const { userType, formData } = defineProps({
  userType: {
    type: String,
    required: true,
  },
  formData: {
    type: Object,
    required: true,
  },
});
console.log(formData)


const back = () => {
    emit('back');
};

const submit = () => {
  alert('Cadastro finalizado com sucesso!');
  emit('next');
};

</script>

<template>
  <div>
    <p>Etapa <span class="currentStep">{{ currentStep }}</span> de 4</p>
    <h2>Revise suas informações</h2>
    <form @submit.prevent="submitForm">
      <div v-if="userType === 'pf'">
        <label for="name">Endereço de e-mail:</label>
        <input v-model="formData.email" id="name" type="text" required />
        <label for="name">Nome:</label>
        <input v-model="formData.name" id="name" type="text" required />
        <label for="cpf">CPF:</label>
        <input v-model="formData.cpf" id="cpf" type="text" required />
        <label for="birthdate">Data de Nascimento:</label>
        <input v-model="formData.birthdate" id="birthdate" type="date" required />
        <label for="phone">Telefone:</label>
        <input v-model="formData.phone" id="phone" type="text" required />
        <label for="phone">Senha:</label>
        <input v-model="formData.password" id="phone" type="password" required />
      </div>
      
      <div v-if="userType === 'pj'">
        <label for="name">Endereço de e-mail:</label>
        <input v-model="formData.email" id="name" type="text" required />
        <label for="companyName">Razão Social:</label>
        <input v-model="formData.companyName" id="companyName" type="text" required />
        <label for="cnpj">CNPJ:</label>
        <input v-model="formData.cnpj" id="cnpj" type="text" required />
        <label for="openingDate">Data de Abertura:</label>
        <input v-model="formData.openingDate" id="openingDate" type="date" required />
        <label for="phone">Telefone:</label>
        <input v-model="formData.phone" id="phone" type="text" required />
        <label for="phone">Senha:</label>
        <input v-model="formData.password" id="phone" type="password" required />
      </div>

      <div class="buttons">
        <button type="button" id="back" @click="back">Voltar</button>
        <button type="submit">Cadastrar</button>
      </div>
    </form>
  </div>
</template>

<style scoped lang="sass">

  #back
    background-color: white
    border-color:  #ff942f
    color: #213547
  
  .buttons 
    display: flex
    justify-content: space-between
  
  button 
    width: 48%
  
  .currentStep 
    color:  #ff942f
    font-weight: bold
  
  </style>