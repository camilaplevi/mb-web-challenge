<template>
    <div>
        <p>Etapa 3 de 4</p>
        <h2>Senha de acesso</h2>

        <form @submit.prevent="next">
            <label for="password">Sua senha</label>
            <input type="password" id="password" v-model="formData.password" required />
            <div class="buttons">
                <button type="button" @click="back">Voltar</button>
                <button type="submit">Continuar</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['back, next']);

const formData = ref({
    password: '',
});

const back = () => {
    emit('back');
};

const next = () => {
    const isValid = formData.value.password.trim() !== '';

    if (!isValid) {
        alert('Preencha o campo de senha.');
        return;
    }
};
</script>

<style scoped lang="sass">

.buttons
  display: flex
  justify-content: space-between
  
button
  width: 48%

</style>