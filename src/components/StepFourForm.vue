<script setup>
import { ref, defineEmits, defineProps } from 'vue';

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
        <label for="name"><strong>Nome:</strong></label>
        <!-- Usando v-model com formData.name -->
        <input v-model="formData.name" id="name" type="text" required />
        
        <label for="cpf"><strong>CPF:</strong></label>
        <input v-model="formData.cpf" id="cpf" type="text" required />

        <label for="birthdate"><strong>Data de Nascimento:</strong></label>
        <input v-model="formData.birthdate" id="birthdate" type="date" required />

        <label for="phone"><strong>Telefone:</strong></label>
        <input v-model="formData.phone" id="phone" type="text" required />
      </div>
      
      <div v-if="userType === 'pj'">
        <h3>Dados da Pessoa Jurídica</h3>
        <label for="companyName"><strong>Razão Social:</strong></label>
        <input v-model="formData.companyName" id="companyName" type="text" required />
        
        <label for="cnpj"><strong>CNPJ:</strong></label>
        <input v-model="formData.cnpj" id="cnpj" type="text" required />

        <label for="openingDate"><strong>Data de Abertura:</strong></label>
        <input v-model="formData.openingDate" id="openingDate" type="date" required />

        <label for="phone"><strong>Telefone:</strong></label>
        <input v-model="formData.phone" id="phone" type="text" required />
      </div>

      <div class="buttons">
        <button type="button" @click="back">Voltar</button>
        <button type="submit">Cadastrar</button>
      </div>
    </form>
  </div>
</template>

<style scoped lang="sass">
  .buttons 
    display: flex
    justify-content: space-between
  
  
  button 
    width: 48%
  

  .currentStep 
    color: orange
    font-weight: bold
  
  </style>