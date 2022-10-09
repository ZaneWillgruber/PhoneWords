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
    <PhoneWords :hashTable="wordTable"/>
    <div class="awesome-component">
        <pre></pre>
    </div>
</template>