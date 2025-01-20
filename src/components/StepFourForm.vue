<script setup>
import { ref } from 'vue';
import { toRaw } from 'vue';

const currentStep = ref(4)
const showPassword = ref(false)

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const emit = defineEmits(['back', 'submit'])

const { userType, formData } = defineProps({
  userType: {
    type: String,
    required: true,
  },
  formData: {
    type: Object,
    required: true,
  },
})

const back = () => {
  emit('back')
}

const submit = async () => {
  try {
    if (userType === 'pj') {
      if (!formData.companyName || !formData.cnpj || !formData.openingDate || !formData.phone) {
        alert('Preencha todos os campos obrigatórios')
        return
      }
    } else if (userType === 'pf') {
      if (!formData.name || !formData.cpf || !formData.birthdate || !formData.phone) {
        alert('Preencha todos os campos obrigatórios')
        return
      }
    }
    const rawData = toRaw(formData)
    const response = await fetch('http://localhost:3000/registration', {  
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rawData),
    })

    if (response.ok) {
      const result = await response.json()
      alert(`Cadastro finalizado com sucesso! ${result.message}`)
    } else {
      let errorMessage = 'Erro desconhecido'
      try {
        const error = await response.json()
        errorMessage = error.message || errorMessage
      } catch (e) {
      }
      alert(`Erro: ${errorMessage}`)
    }
  } catch (error) {
    alert('Erro ao enviar dados para o servidor.')
  }
}


</script>

<template>
  <div>
    <p>Etapa <span class="currentStep">{{ currentStep }}</span> de 4</p>
    <h2>Revise suas informações</h2>
    <form @submit.prevent="submit">
      <div v-if="userType === 'pf'">
        <label for="email">Endereço de e-mail:</label>
        <input v-model="formData.email" id="email" type="text" required />
        <label for="name">Nome:</label>
        <input v-model="formData.name" id="name" type="text" required />
        <label for="cpf">CPF:</label>
        <input v-model="formData.cpf" id="cpf" type="text" required />
        <label for="birthdate">Data de Nascimento:</label>
        <input v-model="formData.birthdate" id="birthdate" type="date" required />
        <label for="phone">Telefone:</label>
        <input v-model="formData.phone" id="phone" type="text" required />
        <label for="password">Senha:</label>
        <input v-model="formData.password" id="password" :type="showPassword ? 'text' : 'password'" required />
        <div id="inputPassword">
          <input type="radio" :checked="showPassword" @click="togglePasswordVisibility" class="toggle-button">
          <label for="password" id="labelPassword">{{ showPassword ? 'Ocultar Senha' : 'Mostrar Senha' }}</label>
        </div>
      </div>

      <div v-if="userType === 'pj'">
        <label for="email">Endereço de e-mail:</label>
        <input v-model="formData.email" id="email" type="text" required />
        <label for="companyName">Razão Social:</label>
        <input v-model="formData.companyName" id="companyName" type="text" required />
        <label for="cnpj">CNPJ:</label>
        <input v-model="formData.cnpj" id="cnpj" type="text" required />
        <label for="openingDate">Data de Abertura:</label>
        <input v-model="formData.openingDate" id="openingDate" type="date" required />
        <label for="phone">Telefone:</label>
        <input v-model="formData.phone" id="phone" type="text" required />
        <label for="password">Senha:</label>
        <input v-model="formData.password" id="password" :type="showPassword ? 'text' : 'password'" required />
        <div id="inputPassword">
          <input type="radio" :checked="showPassword" @click="togglePasswordVisibility" class="toggle-button">
          <label for="password" id="labelPassword">{{ showPassword ? 'Ocultar Senha' : 'Mostrar Senha' }}</label>
        </div>
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

  #inputPassword
    display: flex
    align-items: center
    justify-content: flex-start
    gap: 8px
    padding-top: 5px

    .toggle-button
      appearance: none
      width: 20px
      height: 20px
      border: 1px solid #213547
      border-radius: 50%
      outline: none
      cursor: pointer
      display: inline-block
      position: relative
      background-color: transparent
      padding-top: 10px

      &::after
        content: ''
        position: absolute 
        width: 10px
        height: 10px
        border-radius: 50%
        background-color: black
        top: 50%
        left: 50%
        transform: translate(-50%, -50%) 

        &:not(:checked)
          background-color: transparent

  #labelPassword
    cursor: pointer
    font-size: 14px
  
  </style>