<template>
    <div>
        <p>Etapa <span class="currentStep">{{ currentStep }}</span> de 4</p>
        <h2>Revise suas informações</h2>
        <form @submit.prevent="submitForm">
            <div v-if="userType === 'pf'">
                <p><strong>Nome:</strong> {{ formData.name }}</p>
                <p><strong>CPF:</strong> {{ formData.cpf }}</p>
                <p><strong>Data de Nascimento:</strong> {{ formData.birthdate }}</p>
                <p><strong>Telefone:</strong> {{ formData.phone }}</p>
            </div>
            <div v-if="userType === 'pj'">
                <h3>Dados da Pessoa Jurídica</h3>
                <p><strong>Razão Social:</strong> {{ formData.companyName }}</p>
                <p><strong>CNPJ:</strong> {{ formData.cnpj }}</p>
                <p><strong>Data de Abertura:</strong> {{ formData.openingDate }}</p>
                <p><strong>Telefone:</strong> {{ formData.phone }}</p>
            </div>
            <div class="buttons">
                <button type="button" @click="back">Voltar</button>
                <button type="submit">Cadastrar</button>
            </div>
        </form>
    </div>
</template>

<script setup>

import { ref, defineEmits, defineProps, watch } from 'vue';

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