<script setup>
import { ref } from 'vue';

const currentStep = ref(3)
const emit = defineEmits(['back', 'next'])
const formData = ref({
    password: '',
})

const back = () => {
    emit('back')
}

const next = () => {
    const isValid = formData.value.password.trim() !== ''
    if (!isValid) {
        alert('Preencha o campo de senha.')
        return
    }
    emit('next', formData.value)
}
</script>

<template>
    <div>
        <p>Etapa <span class="currentStep">{{ currentStep }}</span> de 4</p>
        <h2>Senha de acesso</h2>
        <form @submit.prevent="next">
            <label for="password">Sua senha</label>
            <input type="password" id="password" v-model="formData.password" required />
            <div class="buttons">
                <button type="button" id="back" @click="back">Voltar</button>
                <button type="submit">Continuar</button>
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
  color: orange
  font-weight: bold
  
</style>
