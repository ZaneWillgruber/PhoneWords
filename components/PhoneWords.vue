<template>
    <div style="text-align: center;">
        <input v-on:input="findWords" v-model="number" placeholder="(000) 000-000" @input="acceptNumber" />
        <br>
        <p style="color:red" v-if="number.length != 14">Must be a valid phone number</p>
        
        <h2 v-if="words.length == 0 && number.length == 14"> Your phone number can't be translated to words :(</h2>

        <div v-if="hasContent(words, 3) != false && hasContent(words, 4) != false">
            <h2>3 and 4 letter words:</h2>
            <div class="grid-container">
                <div v-for="word in combinedWords(words)">
                    <p class="grid-item">1-{{ number.substring(0, 5) }} {{ word }}</p>
                </div>
            </div>
        </div>

        <div v-for="n in [10, 7, 4, 3]">
            <div v-if="words.length > 0 && hasContent(words, n)">
                <h2> {{ n }} letter words:</h2>
                <div class="grid-container">
                <div v-for="word in filterWords(words, n)">
                    <div v-if="word.length == n">
                        <p v-if="word.length == 10" class="grid-item">1-{{ word }}</p>
                        <p v-if="word.length == 7" class="grid-item">1-{{ number.substring(0, 5) }} {{ word }}</p>
                        <p v-if="word.length == 4" class="grid-item">1-{{ number.substring(0, 10) }}{{ word }}</p>
                        <p v-if="word.length == 3" class="grid-item">1-{{ number.substring(0, 5) }} {{ word }}{{
                                number.substring(9, 14)
                        }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>


    </div>
</template>

<script>

export default {
    props: {
        hashTable: {
            type: Object,
        }
    },
    methods: {
        acceptNumber() {
            var x = this.number.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            this.number = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        },
        findWords() {
            const wordList = new Map([
                [10, []],
                [7, []],
                [4, []],
                [3, []]
            ]);
            if (this.number.length == 14) {
                var tempList = [];
                wordList.forEach((value, key) => {
                    var num = this.number.replace(/\D/g, '');
                    var numSubString = key == 3 ? num.toString().substring(3, 6) : num.toString().substring(0 + (num.length - key), num.length);

                    var temp = this.hashTable.search(parseInt(numSubString));
                    if (temp != null) {
                        do {
                            tempList.push(temp.value.toString().toUpperCase());
                            temp = temp.next;
                        }
                        while (temp != null);
                        wordList.set(key, { words: tempList });
                    }

                });

                this.words = tempList;

            }
            else if (this.number.length < 14) {
                this.words = [];
            }
            //this.words = this.number;
            //this.words = this.hashTable.search(this.number);
        },
        filterWords(arr, length) {
            return arr.filter(word => word.length == length);
        },
        hasContent(arr, length) {
            if (arr.length > 0) {
                //return true if there is a word of length length in arr
                return arr.some(word => word.length == length);
            }

            return false;
            
        },
        combinedWords(arr) {
            //return array of combined words of length 3 and 4 from orriginal array
            var combined = [];
            var three = arr.filter(word => word.length == 3);
            var four = arr.filter(word => word.length == 4);
            for (var i = 0; i < three.length; i++) {
                for (var j = 0; j < four.length; j++) {
                    combined.push(three[i] + '-' + four[j]);
                }
            }
            return combined.length > 0 ? combined : false;
        }
    },
    data: () => ({
        number: '',
        words: []
    }),
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Didact+Gothic&display=swap');

:root {
    font-family: 'Didact Gothic', sans-serif;
}

input {
    font-size: xx-large;
    text-align: center;
}

.grid-container {
    display: inline-grid;
    grid-template-columns: auto auto auto;
    padding: 10px;
}

.grid-item {
    background-color: #DFD3C3;
    border: 1px solid rgba(0, 0, 0, 0.8);
    padding: 20px;
    font-size: 20px;
    text-align: center;
    margin-left: 10px;
    margin-right: 10px;
    font-weight: bold;
}
</style>