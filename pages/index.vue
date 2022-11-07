<script setup lang="ts">
import { HashTable } from '~~/classes/HashTable';

const { data: words } = await useFetch(() => `/api/words`)
const wordTable = new HashTable();

for (const key of Object.keys(words.value)) {
    words.value[key].forEach((word) => {
        if (word.length == 10 || word.length == 7 || word.length == 4 || word.length == 3) {
            wordTable.insert(word);
        }
    });
}

</script>

<template>
    <div class="head">
        <h1>PhoneWords</h1>
        <h2>Turn your phone number into words!</h2>
    </div>

    <Footer />

    <PhoneWords :hashTable="wordTable"/>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Didact+Gothic&display=swap');
    .head {
        font-family: 'Didact Gothic', sans-serif;
        text-align: center;
        color: #7D6E83;
    }
    h1 {
        font-size: 5em;
        margin-bottom: 0%;
    }

    h2 {
        font-family: 'Didact Gothic', sans-serif;
        text-align: center;
        color: #7D6E83;
    }

    :root {
        background-color: #F8EDE3;
    }
</style>