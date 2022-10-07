<script setup lang="ts">
import { HashTable } from '~~/classes/HashTable';

const { data: words } = await useFetch(() => `/api/words`)
const wordTable = new HashTable();
console.log(wordTable);

for(const key of Object.keys(words.value)) {
    console.log(`${key}`);
    words.value[key].forEach((word) => {
        wordTable.insert(word);
    });
}

console.log(wordTable);
console.log(wordTable.search(793));

</script>

<template>
    <PhoneWords />
    <div class="awesome-component">
        <pre>{{ words }}</pre>
    </div>
</template>