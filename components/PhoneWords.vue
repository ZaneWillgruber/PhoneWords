<template>
    <div style="text-align: center;">
        <p>Number is: {{ number }}</p>
        <input v-model="number" placeholder="(000) 000-000" @input="acceptNumber"/>
        <button @click="showNumber = !showNumber"> Submit </button>
        <br>
        <p style="color:red" v-if="number.length != 14">Must be a valid phone number</p>
        <p v-if="showNumber">{{ number }}</p>
        <p> {{ words }}</p>
    </div>
</template>

<script>
export default {
    methods: {
        acceptNumber() {
            var x = this.number.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            this.number = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        }
    },
    data: () => ({
            number: '',
            showNumber: false,
            words: '',
    }),
}
</script>

<style lang="">
    
</style>