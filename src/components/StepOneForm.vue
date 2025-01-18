<template>
    <div>
        <p>Etapa 1 de 4</p>
        <h2>Seja bem vindo(a)</h2>
        <form @submit.prevent="next">
                <label for="email">Endereço de e-mail</label>
                <input v-model="email" type="email" id="email" required />
            <div>
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

const email = ref('');
const picked = ref('')
const emit = defineEmits(['next']);

const next = () => {
  if (email.value && picked.value) {
    const formData = { email: email.value, userType: picked.value };
    // Emitir dados para o componente pai
    emit('next', formData);
  } else {
    alert('Por favor, preencha todos os campos.');
  }
};
</script>

<style scoped>

.p {

}

.label {

}
</style>