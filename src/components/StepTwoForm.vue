StepTwoForm

<template>
  <div>
    <form @submit.prevent="next">
      <div v-if="userType === 'pf'">
        <p>Etapa <span class="currentStep">{{ currentStep }}</span> de 4</p>
        <h2>Pessoa Física</h2>
        <label for="name">Nome</label>
        <input type="text" id="name" v-model="formData.name" required />

        <label for="cpf">CPF</label>
        <input type="text" id="cpf" v-model="formData.cpf" required maxlength="14" @input="formatCPF" />

        <label for="birthdate">Data de Nascimento</label>
        <input type="date" id="birthdate" v-model="formData.birthdate" required />

        <label for="phone">Número de Telefone</label>
        <input type="tel" id="phone" v-model="formData.phone" required maxlength="15" @input="formatPhone" />
      </div>

      <div v-if="userType === 'pj'">
        <p>Etapa <span class="currentStep">{{ currentStep }}</span> de 4</p>
        <h2>Pessoa Jurídica</h2>
        <div>
          <label for="companyName">Razão Social</label>
          <input type="text" id="companyName" v-model="formData.companyName" required />

          <label for="cnpj">CNPJ</label>
          <input type="text" id="cnpj" v-model="formData.cnpj" required maxlength="18" @input="formatCNPJ" />

          <label for="openingDate">Data de Abertura</label>
          <input type="date" id="openingDate" v-model="formData.openingDate" required />

          <label for="companyPhone">Telefone</label>
          <input type="tel" id="companyPhone" v-model="formData.phone" required maxlength="15" @input="formatPhone" />
        </div>
      </div>

      <div class="buttons">
        <button type="button" @click="back">Voltar</button>
        <button type="submit">Continuar</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['back','next'])

const currentStep = ref(2);

const { userType } = defineProps({
  userType: {
    type: String,
    required: true,
  }
});

const formData = ref({
  userType,
  name: '', 
  cpf: '', 
  birthdate: '', 
  phone: '',
  companyName: '',
  cnpj: '', 
  openingDate: '',
});

// Função para formatar CPF
const formatCPF = () => {
  formData.value.cpf = formData.value.cpf
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    .slice(0, 14); 
};

// Função para formatar CNPJ
const formatCNPJ = () => {
  formData.value.cnpj = formData.value.cnpj
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,4})$/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})$/, '$1-$2')
    .slice(0, 18)
};

// Função para formatar telefone
const formatPhone = () => {
  formData.value.phone = formData.value.phone
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4,5})(\d{4})$/, '$1-$2')
    .slice(0, 15); 
};

const back = () => {
  emit('back');
};

const next = () => {
  let isValid = true;
  
  if (userType === 'pf') {
    isValid = formData.value.name.trim() !== '' &&
              formData.value.cpf.trim() !== '' &&
              formData.value.birthdate.trim() !== '' &&
              formData.value.phone.trim() !== ''
  } else if (userType === 'pj') {
    isValid = formData.value.companyName.trim() !== '' &&
              formData.value.cnpj.trim() !== '' &&
              formData.value.openingDate.trim() !== '' &&
              formData.value.phone.trim() !== ''
  }

  if (!isValid) {
    alert('Preencha todos os campos obrigatórios.')
    return
  }

  emit('next', { ...formData.value, userType: userType })
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
