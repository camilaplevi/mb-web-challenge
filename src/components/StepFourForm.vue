<template>
    <div>
        <p>Etapa <span class="currentStep">{{ currentStep }}</span> de 4</p>
        <h2>Revise suas informações</h2>

        <form @submit.prevent="submitForm">
            <div v-for="(value, key) in formData" :key="key" class="form-group">
                <label :for="key">{{ label(key) }}</label>
                <input v-if="key !== 'password'" type="text" :id="key" v-model="formData[key]" :required="true" />
                <input v-else type="password" :id="key" v-model="formData[key]" :required="true" />
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

const currentStep = ref(4);

const emit = defineEmits(['back', 'submit'])

const formData = ref({
    email: '',
    username: '',
    cpf: '',
    birthdate: '',
    phone: '',
    password: '',
});

const label = (key) => {
    const labels = {
        email: 'Endereço de e-mail',
        username: 'Nome',
        cpf: 'CPF',
        birthdate: 'Data de nascimento',
        phone: 'Telefone',
        password: 'Senha de acesso',
    };
    return labels[key] || key;
};

const back = () => {
    emit('back')
};

const submitForm = () => {
    const isValid = Object.values(formData.value).every((field) => field.trim() !== '')

    if (!isValid) {
        alert('Por favor, preencha todos os campos corretamente.')
        return
    }

    if (!/\S+@\S+\.\S+/.test(formData.value.email)) {
        alert('Por favor, insira um e-mail válido.')
        return
    }

    emit('submit', formData.value)
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